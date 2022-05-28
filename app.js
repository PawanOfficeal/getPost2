//fetch 1 :
const url1 = `https://jsonplaceholder.typicode.com/comments/1`;
const url2 = `https://jsonplaceholder.typicode.com/comments/2`;
const url3 = `https://jsonplaceholder.typicode.com/comments/3`;
const dataBtn = document.getElementById('dataBtn');
const getDataArticle = document.getElementById('article1');

dataBtn.addEventListener('click', function(){
	fetch( `https://jsonplaceholder.typicode.com/comments/1`)
	.then(response=>{
		return response.json();
	})
	.then(data=>{
		console.log(data);
		getDataArticle.innerHTML = `Name: ${data.name}<br> EMail: ${data.email}`;
	})
	.catch(err=>{
		console.error(err);
	})
})
//---------------------------------------------------------------------
//fetch 2 :
window.addEventListener('DOMContentLoaded',asyncFetch);
const dataPara = document.getElementById('article2');
const errorPara = document.getElementById('errorPara');
async function asyncFetch(){
      let timer = setTimeout(()=>{
      	new AbortController().abort();
      	errorPara.innerHTML = `ERROR:timeout`;
      },500);
      let signal = new AbortController().signal;

      let request = await fetch(url1,{
      	method:'GET',
      	signal:signal
      })
      clearTimeout(timer);
      if(request.status>=400 && request.status<600){
      	throw new Error(`SERVER ERROR:${request.status}`)
      }
      else if(request.status!==200){
      	throw new Error(`NETWORK ERROR:${request.status}`)
      }

      let result = await request.json();
      return result;
}
asyncFetch()

.then(data=>{
	console.log(data);
	dataPara.innerHTML = `Name:${data.name} E-Mail : ${data.email}`
})
.catch(err=>{
	console.log(err);
	errorPara.innerHTML = err;
});
//----------------------------------------------------------------------------
//Promise.allSettled():
const urls = [`https://jsonplaceholder.typicode.com/comments/1`,
             `https://jsonplaceholder.typicode.com/comments/2`, 
             `https://jsonplaceholder.typicode.com/comments/3`]
window.addEventListener('DOMContentLoaded',proAllSettledFun);
const err1 = document.getElementById('err1');
const dataPara2 = document.getElementById('dataPara2');

async function proAllSettledFun(){
    let requests = await Promise.allSettled(urls.map(url=>fetch(url)
    	.then(responseAll=>{
    		console.log(responseAll);
    		return responseAll.json();
    	})
    	))
    .then(datas=>{
    	console.log(datas);
    	const htmlData = datas.map(data=>{
    		return `<p>Name: ${data.value.name} E:Mail: ${data.value.email}<br>`;
    	});
    	dataPara2.innerHTML = htmlData.join("");
    })
    .catch(err=>{
    	console.error(err);
    	err1.innerHTML = err;
    })
}
proAllSettledFun()

//----------------------------------------------------------------
const urls1 =  [`https://jsonplaceholder.typicode.com/comments/1`,
             `https://jsonplaceholder.typicode.com/comments/2`, 
             `https://jsonplaceholder.typicode.com/comments/3`]
const timeoutErr = document.getElementById('timeoutErr');
const dataPara3 = document.getElementById('dataPara3');
const err3 = document.getElementById('err3');

window.addEventListener('DOMContentLoaded', async3);

async function async3(){
	let timer = setTimeout(()=>{
		new AbortController().abort();
		timeoutErr.innerHTML = `ERR:TIME_OUT`;
	},1000);
	let signal = new AbortController().signal;
	let req = await Promise.allSettled(urls1.map((url)=>{
		return fetch(url,{
			method:'GET',
			signal:signal
		}).then(response=>{
			clearTimeout(timer);
			console.log(response);
			return response.json();
		})
	}))
	.then(datas=>{
		console.log(datas);
		const data3 = datas.map((data,i)=>{
          if(data.status=='fulfilled'){
          	return `NAME:${data.value.name}<br>`;
          }
          else if(data.status=='rejected'){
          	return `ERROR:${url1[i]}not responding`;
          }
		});
		dataPara3.innerHTML = data3.join("");
	})
	.catch(err=>{
		console.error(err);
		err3.innerHTML = err;
	})
}

//--------------------------------------------------------------------

//const foo = async () => {
  // do something
//}
//POST : (i) DATA   (ii) FORM DATA 
 const POST_URL = 'https://reqres.in/api/users';
 const postBtn1 = document.getElementById('postBtn1');
 const postData1Para = document.getElementById('postData1');

 const data1 = {
 	name:"John",
 	city:"Dallas",
 	email:"johnDoe@gmail.com"
 }
const postFun1 = async ()=>{
       await fetch('https://reqres.in/api/users',{
       	method:'POST',
       	body:JSON.stringify(data1),
       	headers:{
       		"Content-Type":"application/json; charset=UTF-8"
       	}
       })
       .then(response=>{
       	if(!response.ok){
       		throw new Error(`ERR:${response.message} ${response.status}`);
       	}
       	return response;
       })
       .then(response=>{
       	return response.json();
       })
       .then(data=>{
       	console.log(data);
       })
       .catch(err=>{
       	console.error(err);

       })
 }
 postBtn1.addEventListener('click',postFun1);

 //--------------------------------------------------------
 const postUrl2 = 'https://jsonplaceholder.typicode.com/posts'
 