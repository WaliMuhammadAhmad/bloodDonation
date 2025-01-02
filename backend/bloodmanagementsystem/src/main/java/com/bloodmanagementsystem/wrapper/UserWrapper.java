package com.bloodmanagementsystem.wrapper;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserWrapper {

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("city")
    private String city;

    @JsonProperty("password")
    private String password;

    public UserWrapper(Integer id, String name, String email, String city, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.city = city;
        this.password = password;
    }

}
