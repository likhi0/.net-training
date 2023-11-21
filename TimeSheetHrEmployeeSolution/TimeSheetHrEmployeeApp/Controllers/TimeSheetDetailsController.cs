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
    public class TimeSheetDetailsController : ControllerBase
    {
        private readonly ITimeSheetDetailsService _timesheetdetailsService;
        public TimeSheetDetailsController(ITimeSheetDetailsService timesheetdetailsService)
        {
            _timesheetdetailsService = timesheetdetailsService;
                
        }

        [HttpGet]
        public ActionResult Get()
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _timesheetdetailsService.GetAllDetails();
                return Ok(result);
            }
            catch (NoDetailsFoundException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPost]
        public ActionResult Create(TimeSheetDetails timesheetdetails)
        {
            var result = _timesheetdetailsService.AddTimesheetDetails(timesheetdetails);
            if (result)
                return Ok(timesheetdetails);
            return BadRequest("Could not add time sheet");
        }
    }
}
