using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Interface
{
    public interface ITasksService
    {
        Tasks AddTask(Tasks task);

        IList<Tasks> GetAllTasks();
    }
}
