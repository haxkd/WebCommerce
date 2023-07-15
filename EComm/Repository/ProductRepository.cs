using EComm.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using BusinessLogicLayer;
using DataAccessLayer.Models;
using System.IO;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace EComm.Repository
{
    public class ProductRepository : IProducts
    {
        public ProductLogic logic;
        public ProductRepository(ProductLogic logic)
        {
            this.logic = logic;
        }

        public List<Product> GetProducts()
        {
            try
            {
                return logic.GetProducts();
            }
            catch
            {
                throw;
            }
        }
        public List<Product> ProductsByCat(string cat)
        {
            try
            {
                return logic.ProductsByCat(cat);
            }
            catch
            {
                throw;
            }
        }
        public List<Product> ProductsSearch(string query)
        {
            try
            {
                return logic.ProductsSearch(query);
            }
            catch
            {
                throw;
            }
        }
        public List<string> AllCategories()
        {
            try
            {
                return logic.AllCategories();
            }
            catch
            {
                throw;
            }
        }

        public Product GetProduct(int id)
        {
            try
            {
                return logic.GetProduct(id);
            }
            catch
            {
                throw;
            }
        }

        public Product AddProduct(ProductModel product1)
        {
            try
            {
                return logic.AddProduct(product1);
            }
            catch
            {
                throw;
            }
        }
        public Product UpdateProduct(int id,ProductModel product1)
        {
            try
            {               
                return logic.UpdateProduct(id,product1);
            }
            catch
            {
                throw;
            }
        }
        public Product DeleteProduct(int id)
        {
            try
            {
                return logic.DeleteProduct(id);
            }
            catch
            {
                throw;
            }
        }
    }
}
