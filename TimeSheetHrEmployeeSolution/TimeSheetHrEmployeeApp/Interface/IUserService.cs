using TimeSheetHrEmployeeApp.Models.DTO;
namespace TimeSheetHrEmployeeApp.Interface
{
    public interface IUserService
    {

        UserDTO Login(UserDTO userDTO);
        UserDTO Register(UserDTO userDTO);
    }
}
