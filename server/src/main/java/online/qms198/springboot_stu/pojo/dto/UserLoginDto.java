package online.qms198.springboot_stu.pojo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public class UserLoginDto {
    @NotBlank(message = "密码不能为空")
    @Length(min = 6, max = 12)
    private String password;

    @Length(min = 8, max = 12)
    @Pattern(regexp = "^[0-9]+$", message = "userAccount必须为数字")
    private String userAccount;



    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    @Override
    public String toString() {
        return "UserLoginDto{" +
                "password='" + password + '\'' +
                ", userAccount='" + userAccount + '\'' +
                '}';
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
