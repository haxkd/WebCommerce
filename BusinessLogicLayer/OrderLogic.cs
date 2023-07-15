using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class OrderLogic
    {
        readonly DatabaseContext _context;

        public OrderLogic(DatabaseContext dbContext)
        {
            _context = dbContext;
        }
        public void AddToCart(int uid,AddCartModel addcart)
        {
            try
            {
                
                var cart1 = _context.Carts.FirstOrDefault(x => x.uid == uid && x.pid == addcart.pid);
                if (cart1 != null)
                {
                    cart1.quantity = cart1.quantity + addcart.quantity;
                }
                else
                {
                    Cart cart = new Cart();
                    cart.pid = addcart.pid;
                    cart.quantity = addcart.quantity;
                    cart.uid = uid;
                    _context.Carts.Add(cart);
                }
                _context.SaveChanges();
            }
            catch
            {
                throw;
            }
        }
    
        public List<CartModel> GetCart(int uid)
        {
            List<CartModel> cartModels = new List<CartModel>();
            var carts = _context.Carts.Where(x => x.uid == uid).ToList();
            var products = _context.Products.ToList();
            foreach (Cart cart in carts)
            {
                CartModel cartModel = new CartModel();
                cartModel.cid = cart.cid;
                cartModel.uid = uid;
                cartModel.pid = cart.pid;
                cartModel.product = products.FirstOrDefault(x => x.pid == cart.pid);
                cartModel.quantity = cart.quantity;
                cartModels.Add(cartModel);
            }
            return cartModels;
        }
    
        public Cart putCart(int id, int quantity)
        {
            try
            {
                var cart = _context.Carts.FirstOrDefault(x => x.cid == id);
                if (cart != null)
                {
                    cart.quantity = quantity;
                    _context.SaveChanges();
                }
                return cart;
            }
            catch
            {
                throw;
            }
        }
    
        public void makeOrder(int uid)
        {
            {
                Random random = new Random();
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                string OrderId = "OID" + (new string(Enumerable.Repeat(chars, 10).Select(s => s[random.Next(s.Length)]).ToArray()));

                try
                {                    
                    var carts = _context.Carts.Where(x => x.uid == uid).ToList();
                    if (carts == null)
                    {
                        return;
                    }
                    List<Order> orders = new List<Order>();
                    foreach (var cart in carts)
                    {
                        if (cart.quantity == 0)
                        {
                            continue;
                        }
                        Order order = new Order();
                        order.PId = cart.pid;
                        order.quantity = cart.quantity;
                        order.OrderdId = OrderId;
                        order.date = DateTime.Now.ToString();
                        order.uid = uid;
                        orders.Add(order);
                        _context.Carts.Remove(cart);
                        _context.Orders.Add(order);
                        _context.SaveChanges();
                    }

                    _context.SaveChanges();
                   
                }
                catch
                {
                    throw;
                }
            }
        }
    
        public List<OrderModel> Orders(int uid)
        {
            try
            {
                var orders = _context.Orders.Where(x => x.uid == uid).ToList();
                var products = _context.Products.ToList();
                List<OrderModel> ordersModel = new List<OrderModel>();
                foreach (Order order in orders)
                {
                    OrderModel orderModel = new OrderModel();
                    orderModel.OrderdId = order.OrderdId;
                    orderModel.OrderId = order.OrderId;
                    orderModel.uid = order.uid;
                    orderModel.PId = order.PId;
                    orderModel.quantity = order.quantity;
                    orderModel.date = order.date;
                    orderModel.product = products.FirstOrDefault(x => x.pid == order.PId);
                    ordersModel.Add(orderModel);
                }
                return ordersModel;
            }
            catch
            {
                throw;
            }
        }
    }
}
