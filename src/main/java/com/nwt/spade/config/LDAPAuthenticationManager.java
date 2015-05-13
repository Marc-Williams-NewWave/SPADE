//package com.nwt.spade.config;
//
//import org.springframework.ldap.core.AuthenticationSource;
//import org.springframework.ldap.core.support.LdapContextSource;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.ldap.DefaultSpringSecurityContextSource;
//import org.springframework.security.ldap.authentication.BindAuthenticator;
//import org.springframework.security.ldap.authentication.LdapAuthenticationProvider;
//import org.springframework.security.ldap.search.FilterBasedLdapUserSearch;
//import org.springframework.stereotype.Component;
//
////@Component
//public class LDAPAuthenticationManager implements AuthenticationManager {
//
//
//    LdapAuthenticationProvider provider = null;
//
//    @Override
//    public Authentication authenticate(Authentication arg0)
//            throws AuthenticationException {
//
//        return provider.authenticate(arg0);
//    }
//
//    LDAPAuthenticationManager() {
//
//        DefaultSpringSecurityContextSource contextSource = new DefaultSpringSecurityContextSource(
//                "ldap://127.0.0.1:389");
//        contextSource.setUserDn("test.com\\Administrator");
//        contextSource.setCacheEnvironmentProperties(true);
//        try {
//            contextSource.afterPropertiesSet();
//        } catch (Exception e) {
//
//            e.printStackTrace();
//        }
//        contextSource.setPassword("asdasdasdjBj,K");
//
//        LdapContextSource ldapSrc = new LdapContextSource();
//        ldapSrc.setUrl("ldap://127.0.0.1:389");
//        ldapSrc.setUserDn("test.com\\Administrator");
//        ldapSrc.setPassword("asdasdasdjBj,K");
//        ldapSrc.setAnonymousReadOnly(false);
//        ldapSrc.setCacheEnvironmentProperties(true);
//
//        try {
//            ldapSrc.afterPropertiesSet();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        ldapSrc.setAuthenticationSource(new AuthenticationSource() {
//
//            @Override
//            public String getPrincipal() {
//                // TODO Auto-generated method stub
//                return "test.com\\Administrator";
//            }
//
//            @Override
//            public String getCredentials() {
//                // TODO Auto-generated method stub
//                return "asdasdasdjBj,K";
//            }
//        });
//
//        FilterBasedLdapUserSearch userSearch = new FilterBasedLdapUserSearch(
//                "cn=Users,dc=digitronic,dc=lan", "(sAMAccountName={0})",
//                ldapSrc);
//
//        BindAuthenticator bindAuth = new BindAuthenticator(contextSource);
//        bindAuth.setUserSearch(userSearch);
//        provider = new LdapAuthenticationProvider(bindAuth);
//    }
//    
//    public static void main(String[] args){
//    	LDAPAuthenticationManager test = new LDAPAuthenticationManager();
//    	
//    }
//}
