using TimeSheetHrEmployeeApp.Models.DTO;

namespace TimeSheetHrEmployeeApp.Interface
{
    public interface ITokenService
    {
        string GetToken(UserDTO user);
    }
}
