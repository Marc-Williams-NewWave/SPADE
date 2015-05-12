package com.nwt.spade.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.annotation.Id;

import java.io.Serializable;

/**
 * A Author.
 */
public class Author implements Serializable {

    @Id
    private String id;
    private String name;

    private String phone;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Author author = (Author) o;

        if (id != null ? !id.equals(author.id) : author.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public String toString() {
        return "Author{" +
                "id=" + id +
                ", name='" + name + "'" +
                ", phone='" + phone + "'" +
                '}';
    }
}
