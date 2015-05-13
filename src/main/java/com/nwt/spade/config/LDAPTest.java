//package com.nwt.spade.config;
//
//import java.util.List;
//
//import javax.naming.NamingException;
//import javax.naming.directory.Attributes;
//
//import org.springframework.ldap.core.AttributesMapper;
//import org.springframework.ldap.core.DistinguishedName;
//import org.springframework.ldap.core.LdapTemplate;
//import org.springframework.ldap.core.support.LdapContextSource;
//import org.springframework.ldap.filter.EqualsFilter;
//
//public class LDAPTest {
//	public static void main(String[] args) {
//		LdapContextSource ctxSrc = new LdapContextSource();
//		ctxSrc.setUrl("ldap://192.168.5.50:3268");
//		ctxSrc.setBase("DC=Newwave,DC=com");
//		ctxSrc.setUserDn("nwtsvc@newwave.com");
//		ctxSrc.setPassword("Nati0naloneWisd0m2o2o");
//		try {
//			ctxSrc.afterPropertiesSet();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		LdapTemplate tmpl = new LdapTemplate(ctxSrc);
//		//tmpl.lookup("dn=brandon");
//		PersonDao dao = new PersonDao(tmpl);
//        List people = dao.getAllPersonNames();
//	}
//
//	public static class PersonDao {
//
//		private LdapTemplate ldapTemplate;
//
//		public PersonDao(LdapTemplate ldapTemplate) {
//			this.ldapTemplate = ldapTemplate;
//		}
//
//		public void setLdapTemplate(LdapTemplate ldapTemplate) {
//			this.ldapTemplate = ldapTemplate;
//		}
//
//		public List getAllPersonNames() {
//			EqualsFilter filter = new EqualsFilter("objectclass", "person");
//			return ldapTemplate.search(DistinguishedName.EMPTY_PATH,
//					filter.encode(), new AttributesMapper() {
//
//						public Object mapFromAttributes(Attributes attrs)
//								throws NamingException {
//							System.out.println(attrs.get("cn").get());
//							return attrs.get("cn").get();
//						}
//					});
//		}
//	}
//
//}
