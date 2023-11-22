using TimeSheetHrEmployeeApp.Exceptions;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Repositories;

namespace TimeSheetHrEmployeeApp.Services
{
    public class TasksService : ITasksService
    {
        private readonly IRepository<int, Tasks> _tasksRepository;
        public TasksService(IRepository<int, Tasks> tasksRepository)
        {
            _tasksRepository = tasksRepository;
        }
        /// <summary>
        /// adding the task
        /// </summary>
        /// <param name="task"></param>
        /// <returns></returns>
        public Tasks AddTask(Tasks task)
        {
            if (task != null)
            {
                var result = _tasksRepository.Add(task);
                return result;
            }
            return null;
        }
        /// <summary>
        /// list of tasks
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NoTaskAvaliableException"></exception>
        public IList<Tasks> GetAllTasks()
        {
            var tasks = _tasksRepository.GetAll();
            if (tasks != null)
            {
                return tasks.ToList();
            }
            throw new NoTaskAvaliableException();
        }
    }
}
