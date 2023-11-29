using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Repositories;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeTesting
{
    public class TaskTest
    {
        IRepository<int, Tasks> repository;
        [SetUp]
        public void Setup()
        {
            var dbOptions = new DbContextOptionsBuilder<TimeSheetHrEmployeeContext>()
                               .UseInMemoryDatabase("dbTestCustomer")//a database that gets created temp for testing purpose
                               .Options;
            TimeSheetHrEmployeeContext context = new TimeSheetHrEmployeeContext(dbOptions);
            repository = new TasksRepository(context);
        }
        [Test]
        public void AddTask()
        {
            ITasksService tasksService = new TasksService(repository);
            var task = new Tasks
            {
                TaskDescription = "chek the testing"
            };
            var result = tasksService.AddTask(task);

            // Assert
            Assert.IsNotNull(result);

        }
        [Test]
        public void GetAllTasks()
        {

            ITasksService tasksService = new TasksService(repository);
            var tasks = tasksService.GetAllTasks();
            Assert.IsNotNull(tasks);

        }
    }
}
