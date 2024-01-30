
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("reactApp")]
    public class ApprovalController : ControllerBase
    {
        private readonly IApprovalService _approvalService;
        private readonly ILogger _logger;
        public ApprovalController(IApprovalService approvalService, ILogger<ApprovalController> logger)
        {
            _approvalService = approvalService;
            _logger = logger;
        }
        /// <summary>
        /// Add the approval
        /// </summary>
        /// <param name="approval"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles="HR")]
        
        public IActionResult AddApproval(Approval approval)
        {
            var result = _approvalService.AddApproval(approval);
            if (result)
            {
                _logger.LogInformation("Post the apporval");
                return Ok(approval);
            }
            _logger.LogError("Approval failed");
            return BadRequest("Could not add approval");
        }
        /// <summary>
        /// getting approvals
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Get(string Username)
        {
            var result = _approvalService.GetAllApprovals(Username);
            if (result != null)
            {
                _logger.LogInformation("Get all approvals");
                return Ok(result);
            }
            _logger.LogError("Approval failed");
            return BadRequest("Could not get approval");

        }
    }
}
