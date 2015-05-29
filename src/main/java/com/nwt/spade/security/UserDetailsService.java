package com.nwt.spade.security;

import com.nwt.spade.controllers.MongoDBController;
import com.nwt.spade.domain.User;
import com.nwt.spade.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.json.JsonObject;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(UserDetailsService.class);

    @Inject
    private UserRepository userRepository;
    
    @Autowired
    private MongoDBController dbController;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        log.debug("Authenticating {}", login);
        String lowercaseLogin = login.toLowerCase();
        Optional<User> userFromDatabase =  userRepository.findOneByLogin(lowercaseLogin);
        Optional<User> ldapFromDatabase =  userRepository.findOneByLdapUser("BRANDONADAMS");
        log.debug("LDAP FROM DATABASE: " + (ldapFromDatabase.isPresent() ? ldapFromDatabase.toString() : "none"));
        JsonObject myUser = null;
        try {
        	myUser = dbController.getUser(lowercaseLogin).getJsonObject(0);
        } catch(Exception e){
        	throw new UsernameNotFoundException("SPADE user " + lowercaseLogin + " was not found in the database");
        }
        
        User temp = new User();
        //temp.
        log.debug("Custom User found {}", myUser);
        return userFromDatabase.map(user -> {
            if (!user.getActivated()) {
                throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
            }
            List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
                    .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                    .collect(Collectors.toList());
            return new org.springframework.security.core.userdetails.User(lowercaseLogin,
                    user.getPassword(),
                    grantedAuthorities);
        }).orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the database"));
    }
}
