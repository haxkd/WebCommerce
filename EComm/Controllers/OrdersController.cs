using EComm.Interface;
using DataAccessLayer.Models;
using BusinessLogicLayer;
using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Http.Cors;

namespace EComm.Controllers
{
    [Route("api/Orders")]
    [ApiController]
    public class OrdersController : Controller
    {

       
        readonly IHttpContextAccessor _httpcontext;
        readonly OrderLogic logic;

        public OrdersController( IHttpContextAccessor httpcontext,OrderLogic logic)
        {            
            _httpcontext = httpcontext ?? throw new ArgumentNullException(nameof(httpcontext));
            this.logic = logic;
        }
        [Authorize]
        [HttpPost("AddToCart/")]
        public async Task<IActionResult> AddToCart(AddCartModel addcart)
        {
            try
            {
                int uid = Convert.ToInt32(_httpcontext.HttpContext.User.Claims
                       .First(i => i.Type == "UserId").Value);
                logic.AddToCart(uid, addcart);
                return Ok("Product Added to cart");
            }
            catch
            {
                return BadRequest("Failed to add cart");
            }
        }

        [Authorize]
        [HttpGet("GetCart/")]
        public async Task<ActionResult<IEnumerable<CartModel>>> GetCart()
        {
            try
            {
                int uid = Convert.ToInt32(_httpcontext.HttpContext.User.Claims
                       .First(i => i.Type == "UserId").Value);
                return Ok(logic.GetCart(uid));
            }
            catch
            {
                return BadRequest("Failed to fetch cart");
            }
        }

        [Authorize]
        [HttpPut("EditCart/{id}")]
        public async Task<ActionResult<IEnumerable<Cart>>> PutCart(int id, int quantity)
        {
            try
            {                
                return Ok(logic.putCart(id,quantity));
            }
            catch
            {
                return BadRequest("Failed to update cart");
            }

        }

        [Authorize]
        [HttpPost("MakeOrder")]
        public async Task<ActionResult<IEnumerable<Cart>>> MakeOrder()
        {            
            try
            {
                int uid = Convert.ToInt32(_httpcontext.HttpContext.User.Claims
                       .First(i => i.Type == "UserId").Value);
                logic.makeOrder(uid);
                return Ok("done");
            }
            catch
            {
                return BadRequest("Failed to make order");
            }
        }
        [Authorize]
        [HttpGet("Orders")]
        public async Task<ActionResult<IEnumerable<OrderModel>>> Orders()
        {
            try
            {
                int uid = Convert.ToInt32(_httpcontext.HttpContext.User.Claims
                       .First(i => i.Type == "UserId").Value);                
                return Ok(logic.Orders(uid));
            }
            catch
            {
                return BadRequest("Failed to make order");
            }
        }
    }
}