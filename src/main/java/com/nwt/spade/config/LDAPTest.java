package com.nwt.spade.config;

import java.util.List;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonValue;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;

import org.springframework.ldap.core.AttributesMapper;
import org.springframework.ldap.core.DistinguishedName;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.ldap.filter.EqualsFilter;
import org.springframework.stereotype.Component;

@Component
public class LDAPTest {
	
	private LdapContextSource ctxSrc;
	private LdapTemplate tmpl;
	
	public LDAPTest(){
		ctxSrc = new LdapContextSource();
		ctxSrc.setUrl("ldap://192.168.5.50:3268");
		ctxSrc.setBase("DC=Newwave,DC=com");
		ctxSrc.setUserDn("nwtsvc@newwave.com");
		ctxSrc.setPassword("Nati0naloneWisd0m2o2o");
		try {
			ctxSrc.afterPropertiesSet();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		tmpl = new LdapTemplate(ctxSrc);
	}
	
	public JsonObject getLDAPUsers(){
		
		//tmpl.lookup("dn=brandon");
		PersonDao dao = new PersonDao(tmpl);
        List<String> people = dao.getAllPersonNames();
        JsonObjectBuilder objBuild = Json.createObjectBuilder();
        JsonArrayBuilder arrBuild = Json.createArrayBuilder();
        for (String obj : people){
        	arrBuild.add(obj);
        }
        objBuild.add("items", arrBuild.build());
        return objBuild.build();
	}
	
//	public static void main(String[] args) {
//		LDAPTest test = new LDAPTest();
//		System.out.println(test.getLDAPUsers());
//	}

	public class PersonDao {

		private LdapTemplate ldapTemplate;

		public PersonDao(LdapTemplate ldapTemplate) {
			this.ldapTemplate = ldapTemplate;
		}

		public void setLdapTemplate(LdapTemplate ldapTemplate) {
			this.ldapTemplate = ldapTemplate;
		}

		public List<String> getAllPersonNames() {
			EqualsFilter filter = new EqualsFilter("objectclass", "person");
			
			return ldapTemplate.search(DistinguishedName.EMPTY_PATH,
					filter.encode(), new AttributesMapper() {
						public Object mapFromAttributes(Attributes attrs)
								throws NamingException {
							return attrs.get("cn").get();
						}
					});
		}
	}

}
