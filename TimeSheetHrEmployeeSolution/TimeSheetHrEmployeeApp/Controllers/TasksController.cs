using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeSheetHrEmployeeApp.Exceptions;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("reactApp")]
    public class TasksController : ControllerBase
    {
        private readonly ITasksService _tasksService;
        private readonly ILogger _logger;
        public TasksController(ITasksService tasksService, ILogger<TasksController> logger)
        {
            _tasksService = tasksService;
            _logger = logger;
        }
        /// <summary>
        /// getting the tasks
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        public ActionResult Get()
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _tasksService.GetAllTasks();
                _logger.LogInformation("all tasks");
                return Ok(result);
            }
            catch (NoTaskAvaliableException e)
            {
                errorMessage = e.Message;
            }
            _logger.LogError("task added failed");
            return BadRequest(errorMessage);
        }
        /// <summary>
        /// add the task
        /// </summary>
        /// <param name="tasks"></param>
        /// <returns></returns>
       
        [HttpPost]
        public ActionResult Create(Tasks tasks)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _tasksService.AddTask(tasks);
                _logger.LogInformation("add the task");
                return Ok(result);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            _logger.LogError("task failed");
            return BadRequest(errorMessage);
        }
    }
}
