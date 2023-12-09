using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Interface
{
    public interface ITimeSheetService
    {
        bool AddTimeSheet(TimeSheet timeSheet);

        TimeSheet GetAllTimeSheets(string username);
        TimeSheet UpdateTimeSheet(TimeSheet timeSheet);
    }
        
}
