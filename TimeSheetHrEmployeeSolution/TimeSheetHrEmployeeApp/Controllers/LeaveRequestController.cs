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
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequestService _leaverequestService;
        private readonly ILogger _logger;
        public LeaveRequestController(ILeaveRequestService leaverequestService, ILogger<LeaveRequestController> logger)
        {
            _leaverequestService = leaverequestService;
            _logger = logger;
        }
        /// <summary>
        /// add the leave
        /// </summary>
        /// <param name="leaverequest"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult AddLeave(LeaveRequest leaverequest)
        {
            var result = _leaverequestService.AddLeave(leaverequest);
            if (result)
            {
                _logger.LogInformation("Asking LeaveRequest");
                return Ok(leaverequest);
            }
            _logger.LogError("LeaveRequet failed");
            return BadRequest("Could not add leave");
        }
        /// <summary>
        /// getting the leaves
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetAllLeaves(string username)
        {
            var leaves = _leaverequestService.GetAllLeaves(username);
            if (leaves != null)
            {
                _logger.LogInformation("Get all leaves");
                return Ok(leaves);
            }
            _logger.LogError("getting leaverequest failed");
            return BadRequest("Could not get leave");
        }
    }
}
