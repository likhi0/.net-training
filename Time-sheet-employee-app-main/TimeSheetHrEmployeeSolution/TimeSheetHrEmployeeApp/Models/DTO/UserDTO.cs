using System.ComponentModel.DataAnnotations;

namespace TimeSheetHrEmployeeApp.Models.DTO
{
    public class UserDTO
    {
        [Required(ErrorMessage = "Username cannot be empty")]
        public string Username { get; set; }=string.Empty;  

        public string ?Role { get; set; }
        public string ?Token { get; set; }
        [Required(ErrorMessage = "Password cannot be empty")]
        public string Password { get; set; }= string.Empty;
    }
}
