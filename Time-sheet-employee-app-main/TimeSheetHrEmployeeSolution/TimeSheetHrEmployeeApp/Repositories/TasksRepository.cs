using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using Microsoft.EntityFrameworkCore;

namespace TimeSheetHrEmployeeApp.Repositories
{
    public class TasksRepository : IRepository<int, Tasks>
    {
        private readonly TimeSheetHrEmployeeContext _context;
        public TasksRepository(TimeSheetHrEmployeeContext context)
        {
            _context = context;
        }

        public Tasks Add(Tasks entity)
        {
            _context.Tasks.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Tasks Delete(int key)
        {
            var tasks = _context.Tasks.Find(key);
            if (tasks != null)
            {
                _context.Tasks.Remove(tasks);
                _context.SaveChanges();
            }
            return tasks;
        }

        public IList<Tasks> GetAll()
        {
            return _context.Tasks.ToList();
        }

        public Tasks GetById(int key)
        {
            var tasks = _context.Tasks.SingleOrDefault(t => t.TaskID == key);
            return tasks;
        }

        public Tasks Update(Tasks entity)
        {
            var existingTask = GetById(entity.TaskID);
            if (existingTask != null)
            {
                _context.Entry(existingTask).CurrentValues.SetValues(entity);
                _context.SaveChanges();
                return existingTask;
            }
            return null;
        }
    }
}
