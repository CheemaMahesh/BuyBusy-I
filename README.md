<h1>BUSY BUY I</h1>
<h1><a href="https://tangerine-gingersnap-3c8b63.netlify.app/">HostedLink</a></h1>
<h3>BuyBusy is a web application for the customers of an e-commerce business.</h3>
<hr>
<h1 >Goal</h1>
<h3>Develop an E-Commerce that enables individuals to browse available items, add or remove them from their shopping cart, and complete the purchasing process.
</h3>
<hr>
&emsp;&emsp;&emsp;&emsp;&emsp;<h1>Acceptance criteria</h1>
<h4>
<ol>
<li>The React app must be integrated with Firebase for Create, Read, Update, and Delete (CRUD) functionality of products in the cart.</li>
<li>The app must have the functionality to register new users and log in the existing users using Firebase Authentication.</li>
<li>The app must implement routing using react-router-dom for different pages.</li>
<li>The app must implement the useContext() hook at least once for managing user authentication or products.</li>
<li>The app must implement proper state management and use React Hooks for handling user interactions and data updates</li>
<li>The code quality of the React app must be of a high standard, with proper documentation of code and functionality.</li>
<li>There must be no cheating or copy-pasting of code from other sources, and all code must be original and developed specifically for this project.</li>
</ol>
</h4>
<hr>
&emsp;&emsp;&emsp;&emsp;&emsp; <h1 >Tasks</h1>
<h4>
<ol>
<li>Create and initialize a new firestore for the BusyBuy app and include it inside the project.
</li>
<li>Create a register page that allows new users to register into your app.</li>
<li>Create a login page that allows existing users to login into your app</li>
<li>Create a home page to display a list of products. The home page should include a feature to search products by name.</li>
<li>Create a cart page to display the products that the user has added to the cart.</li>
<li>Create a product card component that displays the image, title, price, and a button to add or remove that specific product from the cart. If the product is already in the cart, its quantity should be increased.</li>
<li>The product card should only render the increase and decrease buttons if the product is on the cart page</li>
<li>Create an orders page to display the products the user has purchased and the order date.</li>
<li>Additionally, you can add the following functionality to the project to maximize your score:
    <ul>
    <li>Create a sidebar to filter the products based on product price and categories on the HomePage. The search and filter should be applied to the products simultaneously.
</li>
    <li>Add conditional rendering to show the absence of data and loading state using the react-spinners library.</li>
    <li>Show toast messages for async actions and error conditions using the react-toastify library.</li>
    </ul>
</li>

</ol>
</h4>
<hr>
&emsp;&emsp;&emsp;&emsp;&emsp; <h1 >Hints</h1>
<h4>
<p>Use separate contexts to manage the user authentication state and product state. For example, the authentication state may have actions for handling login success, logout, setting the error message, etc.</p>
<p>Create a function that can apply both search and filters at the same time. The function should have distinct logic for filtering based on category, price range, and search terms.</p>
<p>The additional task of the BuyBusy app uses the following third-party components:

-  react-spinners: A simple React spinner library. It can display a circular loader when fetching data from the database. Learn more: <a href="https://github.com/icarus-sullivan/react-spinner-material#readme">link</a> 
-  react-toastify: Allows you to add notifications to your app with ease. It can display the status of network requests and other async actions as a toast. Learn more: <a href="https://fkhadra.github.io/react-toastify/introduction/">link
</a>
</p>
</h4>
<hr>
&emsp;&emsp;&emsp;&emsp;&emsp; <h1 >API Structure</h1>
<h4>
The firebase API would look like this:
<br>
  - /products to store the products 
<br>
  - /usersCarts/<user_uid>/myCart to keep the cart products and their quantity.
  <br>

  - /userOrders/<user_uid>/orders to hold users orders.

</h4>

<hr/>
<h1>Folder Structure</h1>









                                        