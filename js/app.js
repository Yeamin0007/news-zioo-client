const loadCategories = () =>{
    const url ='https://openapi.programming-hero.com/api/news/categories';

    fetch (url)
    .then (res => res.json())
    .then (data => displayCategories(data.data.news_category));
}

 const displayCategories = news_category => {
    const ulContainer = document.getElementById('ul-catagory');

    news_category.forEach(category =>{
        console.log(category)
        const categoryList = document.createElement('li');
        
        categoryList.innerHTML = `
        <li onclick= "showNews('${category.category_id}')" class="list-group-item"> <a class="text-secondary text-decoration-none fs-5" href="#">${category.category_name}</a> </li>
        `;
        ulContainer.appendChild(categoryList);
    })

}

const showNews =(News) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${News}`;
    fetch (url)
    .then (res => res.json())
    .then (data => console.log(data.data));
}

const displayNews = news => {
    const newsContainer = document.getElementById('news-container');

    news.forEach(categoryNews =>{
        console.log(categoryNews)
        const newsDiv = document.createElement('div');
        
        newsDiv.innerHTML = `
        <div class="row g-0">
                  <div class="col-md-4">
                    <img src="..." class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
        `;
        ulContainer.appendChild(categoryList);
    })

}


loadCategories();