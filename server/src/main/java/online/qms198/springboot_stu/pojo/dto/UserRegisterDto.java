package online.qms198.springboot_stu.pojo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import online.qms198.springboot_stu.pojo.PasswordMatch;
import org.hibernate.validator.constraints.Length;

@PasswordMatch
public class UserRegisterDto {
    private Integer userId;
    @NotBlank(message = "用户名不能为空")
    private String userName;
    @NotBlank(message = "密码不能为空")
    @Length(min = 6, max = 12)
    private String password;
    @NotBlank(message = "确认密码不能为空")
    @Length(min = 6, max = 12)
    private String confirmedPassword;
    @Email(message = "email格式不正确")
    private String email;
    @Length(min = 8, max = 12)
    @Pattern(regexp = "^[0-9]+$", message = "userAccount必须为数字")
    private String userAccount;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", userAccount='" + userAccount + '\'' +
                '}';
    }

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public void setConfirmedPassword(String confirmedPassword) {
        this.confirmedPassword = confirmedPassword;
    }

}
