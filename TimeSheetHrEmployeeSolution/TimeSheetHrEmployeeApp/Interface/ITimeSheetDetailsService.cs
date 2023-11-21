using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Interface
{
    public interface ITimeSheetDetailsService
    {
        bool AddTimesheetDetails(TimeSheetDetails timeSheetDetails);
        IList<TimeSheetDetails> GetAllDetails();
    }
}
