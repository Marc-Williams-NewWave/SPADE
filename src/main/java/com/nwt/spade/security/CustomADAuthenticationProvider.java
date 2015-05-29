package com.nwt.spade.security;

import java.util.Optional;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.nwt.spade.domain.User;
import com.nwt.spade.repository.UserRepository;

@Component
public class CustomADAuthenticationProvider implements AuthenticationProvider {

	private final Logger LOG = LoggerFactory.getLogger(CustomADAuthenticationProvider.class);
    
    private ActiveDirectoryLdapAuthenticationProvider adAuthProvider = 
    		new ActiveDirectoryLdapAuthenticationProvider("newwave.com", "ldap://192.168.5.50:3268");
    
    @Inject
    private UserRepository userRepository;
    
//    @Autowired
//    public CustomADAuthenticationProvider(String domain, String url) {
//    	adAuthProvider = new ActiveDirectoryLdapAuthenticationProvider(domain, url);
//	}

    @Override
    @Transactional()
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {
        String principal = authentication.getPrincipal().toString();
        String username = principal.toLowerCase();//.split("@")[0];
        String password = authentication.getCredentials().toString();
        LOG.debug("AD USERNAME: " + username);
        LOG.debug("AD PASSWORD: " + password);
        Optional<User> userFromDatabase = userRepository.findOneByLdapUser(username);
        LdapContextSource ctxSrc = new LdapContextSource();
		ctxSrc.setUrl("ldap://192.168.5.50:3268");
		ctxSrc.setBase("DC=Newwave,DC=com");
		ctxSrc.setUserDn(username+"@newwave.com");
		ctxSrc.setPassword(password);
		try {
			ctxSrc.afterPropertiesSet();
			LOG.debug("AD AUTH ATTEMPT");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if (!userFromDatabase.isPresent()) {
        	throw new UserNotActivatedException("user [" + principal + "] is not registered");
        }
        LOG.debug("TRYING AD AUTH?");
        return adAuthProvider.authenticate(authentication);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return adAuthProvider.supports(authentication);
    }

}
