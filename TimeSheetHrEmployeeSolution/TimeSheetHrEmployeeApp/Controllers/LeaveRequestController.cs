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
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequestService _leaverequestService;
        public LeaveRequestController(ILeaveRequestService leaverequestService)
        {
            _leaverequestService = leaverequestService;
        }
        [HttpPost]
        public IActionResult AddLeave(LeaveRequest leaverequest)
        {
            var result = _leaverequestService.AddLeave(leaverequest);
            if (result)
                return Ok(leaverequest);
            return BadRequest("Could not add leave");
        }
        [HttpGet]
        public ActionResult Get()
        {
            var leaves = _leaverequestService.GetAllLeaves();
            if (leaves == null)
            {
                return BadRequest("could not found"); 
            }
            return Ok(leaves);
            
        }
    }
}
