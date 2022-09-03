
const loadAllNews = () =>{
    const url ='https://openapi.programming-hero.com/api/news/categories';

    fetch (url)
    .then (res => res.json())
    .then (data => displayCategories(data.data.news_category));
}

 const displayCategories = news_category => {
    const ulContainer = document.getElementById('ul-catagory');

    news_category.forEach(category =>{
         
        const categoryList = document.createElement('li');
        
        categoryList.innerHTML = `
        <li  onclick= "showNews('${category.category_id}','${category.category_name}')" class="list-group-item newsName"> <a id="length-name" class=" text-secondary text-decoration-none fs-5" href="#">${category.category_name}</a> </li>`;
       
        ulContainer.appendChild(categoryList);
          
     
    })
    // let a = news_category.map(x=>x.category_name)
    //     console.log(a)
     
}

const showNews =(News,name) =>{
    let x = name
    console.log(x)
    const url = `https://openapi.programming-hero.com/api/news/category/${News}`;
    fetch (url)
    .then (res => res.json())
    .then (data => displayNews(data.data,x));
    toggleSpinner(true);
}
const toggleSpinner = isLoading => {
  const loadingSection = document.getElementById('loader');
  if(isLoading){
    loadingSection.classList.remove('d-none')
  }
  else{
    loadingSection.classList.add('d-none');
  }
}

const displayNews = (news,name) => {
  
  if(news.length == 0){
    toggleSpinner(false); 
    const error = document.getElementById('error');
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    error.innerText = " Data not Found."
    
  } 
  else{
    error.innerText = ""
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    //sort
    news.sort((first, second) => second.total_view - first.total_view)


    news.forEach(categoryNews =>{
         //console.log(categoryNews)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row')
        
        newsDiv.innerHTML = `
        
                  <div class="col-md-4 ">
                    <img src="${categoryNews.thumbnail_url}" class=" news-img rounded" alt="image">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${categoryNews.title}</h5>
                      <p class="card-text">${categoryNews.details.slice(0, 200)}...</p>
                    
                      <div class = "d-flex justify-content-between pt-5">
                      <div class= "d-flex ">
                    <img  src="${categoryNews.author.img}" class=" author-img" alt="image">

                    <p class="card-text px-2"><small class="text-muted">${categoryNews.author.name ? categoryNews.author.name : 'Unknown'}</small></p>

                    
                    </div>

                    <div class= "d-flex">
                    <i class="bi bi-eye-fill px-2"></i>

                    <p class="card-text"><small class="text-muted">${categoryNews.total_view ? categoryNews.total_view : 'no view yet'}</small></p>

                    </div>
                    <button onclick="loadNewsDetails('${categoryNews._id}')" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><small>Read more..</small></button>
                    
                      </div>
                    
                    </div>
                  </div>
            
        `;
        newsContainer.appendChild(newsDiv);
        
        toggleSpinner(false);
        
   })
  }
   
    
  let x = document.getElementsByClassName('row').length
  
  
  //console.log(document.getElementById('length-name').innerText)
  document.getElementById('length-news').innerText =  `${x} ITEM(S) FOUND IN  ${name.toUpperCase()}`
  document.getElementById('length-news').style.border = 'border border-secondary'
}



const loadNewsDetails = (_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${_id}`;
  fetch (url)
  .then (res => res.json())
  .then (data => modalNewsDetails(data.data));
}

const modalNewsDetails = modalDetails =>{
  console.log(modalDetails)
  const modalTitle= document.getElementById('newsDetailModalLabel');
  modalTitle.innerText = modalDetails[0].title;
  const modalBody = document.getElementById('modal-news');
  modalBody.innerHTML=`
  <img class="my-4 w-100" src="${modalDetails[0].thumbnail_url}"></img>
  <p>"${modalDetails[0].details.slice(0, 100)}"</p>
  <p>Author Name: "${modalDetails[0].author.name ? modalDetails[0].author.name : 'Not Found'}"<p>
  <p>Published Date: "${modalDetails[0].author.published_date ? modalDetails[0].author.published_date : 'Not Found'}"</p>
  `
}

// loadNewsDetails();


loadAllNews();