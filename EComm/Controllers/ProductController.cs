using Microsoft.AspNetCore.Mvc;
using EComm.Interface;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Web.Http.Cors;

namespace EComm.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProducts _IProduct;

        public ProductController(IProducts IProduct)
        {
            _IProduct = IProduct;
        }




        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            return await Task.FromResult(_IProduct.GetProducts());
        }



        [HttpGet("category/{cat}")]
        public async Task<ActionResult<IEnumerable<Product>>> ProductByCat(string cat)
        {
            return await Task.FromResult(_IProduct.ProductsByCat(cat));
        }



        [HttpGet("search/{query}")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProduct(string query)
        {
            return await Task.FromResult(_IProduct.ProductsSearch(query));
        }




        [HttpGet("categories/")]
        public async Task<ActionResult<IEnumerable<string>>> AllCategories()
        {
            return await Task.FromResult(_IProduct.AllCategories());
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            try
            {
                var product = await Task.FromResult(_IProduct.GetProduct(id));
                if (product == null)
                {
                    return NotFound();
                }
                return product;
            }
            catch
            {
                return NotFound();
            }
        }



        //[HttpPost]
        //public async Task<ActionResult<Product>> Post(ProductModel product)
        //{
        //    var x = _IProduct.AddProduct(product);
        //    return await Task.FromResult(x);
        //}

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Product>> Post([FromForm] ProductModel postRequest)
        {
            var x = _IProduct.AddProduct(postRequest);
            return await Task.FromResult(x);
        }



        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> Put(int id, [FromForm] ProductModel product1)
        {
            try
            {
                _IProduct.UpdateProduct(id, product1);
            }
            catch (DbUpdateConcurrencyException)
            {

                return BadRequest("Unable to update");

            }
            Product product = await Task.FromResult(_IProduct.GetProduct(id));
            return await Task.FromResult(product);
        }


        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> Delete(int id)
        {
            var product = _IProduct.DeleteProduct(id);
            return await Task.FromResult(product);
        }


    }
}
