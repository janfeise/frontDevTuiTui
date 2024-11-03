package online.qms198.springboot_stu.pojo;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import online.qms198.springboot_stu.pojo.dto.UserRegisterDto; // 根据实际包路径修改

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, UserRegisterDto> {

    @Override
    public void initialize(PasswordMatch constraintAnnotation) {
        // 可选：初始化代码
    }

    @Override
    public boolean isValid(UserRegisterDto userDto, ConstraintValidatorContext context) {
        // 验证 password 和 confirmedPassword 是否一致
        if (userDto.getPassword() == null || userDto.getConfirmedPassword() == null) {
            return false;
        }
        return userDto.getPassword().equals(userDto.getConfirmedPassword());
    }
}
