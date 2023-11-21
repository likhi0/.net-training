using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Models.DTO;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {
        private readonly ITimeSheetService _TimesheetService;
        public TimeSheetController(ITimeSheetService TimesheetService)
        {
            _TimesheetService = TimesheetService;
        }

        [HttpPost]
        public IActionResult AddTimeSheet(TimeSheet timeSheet)
        {
            var result = _TimesheetService.AddTimeSheet(timeSheet);
            if (result)
                return Ok(timeSheet);
            return BadRequest("Could not add time sheet");
        }
        [HttpPut]
        public IActionResult UpdateTimeSheet(TimeSheet timeSheet)
        {
            var updatedProfile = _TimesheetService.UpdateTimeSheet(timeSheet);

            if (updatedProfile == null)
            {
                return NotFound();
            }

            return Ok(updatedProfile);
        }


    }
}
