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
    .then (data => displayNews(data.data));
}

const displayNews = news => {
    const newsContainer = document.getElementById('news-container');

    news.forEach(categoryNews =>{
        console.log(categoryNews)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row')
        
        newsDiv.innerHTML = `
        
                  <div class="col-md-4 ">
                    <img src="${categoryNews.thumbnail_url}" class="img-fluid rounded-start" alt="image">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${categoryNews.title}</h5>
                      <p class="card-text">${categoryNews.details}</p>
                    <div class= "d-flex justify-content-between">
                    <img class= "author-img" src="${categoryNews.author.img}" class="  rounded-start" alt="image">

                    <p class="card-text"><small class="text-muted">${categoryNews.author.name}</small></p>

                    <button class="btn btn-outline-secondary"><small>Read more..</small></button>
                    </div>
                    
                    </div>
                  </div>
            
        `;
        newsContainer.appendChild(newsDiv);
    })

}


loadCategories();