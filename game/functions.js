function sleep(millisecondi)
{
    var now = new Date();
    var exitTime = now.getTime() + millisecondi;

    while(true)
    {
        now = new Date();
        if(now.getTime() > exitTime) return;
    }
}

// функция генерирует целое случайное число от m до n
function randomNumber (m,n)
{
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor( Math.random() * (n - m + 1) ) + m;
}
