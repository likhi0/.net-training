using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Interface
{
    public interface ITimeSheetService
    {
        bool AddTimeSheet(TimeSheet timeSheet);

        //IList<TimeSheet> GetAllTimeSheets();
        TimeSheet UpdateTimeSheet(TimeSheet timeSheet);
    }
        
}
