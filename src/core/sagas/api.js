
export const asyncAction = async function(){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          console.log('done');
          resolve('done')}, 5000)
    })
}