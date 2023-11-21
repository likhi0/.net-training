using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApprovalController : ControllerBase
    {
        private readonly IApprovalService _approvalService;
        public ApprovalController(IApprovalService approvalService)
        {
            _approvalService = approvalService;
        }
        
        [HttpPost]
        public IActionResult AddApproval(Approval approval)
        {
            var result = _approvalService.AddApproval(approval);
            if (result)
                return Ok(approval);
            return BadRequest("Could not add approval");
        }
        [HttpGet]
        public ActionResult Get()
        {
            var leaves = _approvalService.GetAllApprovals();
            if (leaves == null)
            {
                return BadRequest("could not found");
            }
            return Ok(leaves);

        }
    }
}
