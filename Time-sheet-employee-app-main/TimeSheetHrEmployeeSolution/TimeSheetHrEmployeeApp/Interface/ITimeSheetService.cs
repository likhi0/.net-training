using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Interface
{
    public interface ITimeSheetService
    {
        bool AddTimeSheet(TimeSheet timeSheet);

        public IList<TimeSheet> GetAllTimeSheets(string username);
        

    }
        
}
