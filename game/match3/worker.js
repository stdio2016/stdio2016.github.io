var Oj;
var Down;
var Up;
var board={height:9,width:9};
function randomize()
{
  Oj=[];
  Down=[];
  var i,j;
  for(i=0;i<board.width;i++)
  {
    Down.push([]);
    var e=[];
    for(j=0;j<board.height;j++)
    {
      var r=Math.floor(Math.random()*4)+1;
      e.push({'color':r,'pos':0,'speed':0,'dir':0});
      Down[i].push(j<board.width-1?1:0);
    }
    Oj.push(e);
  }
}
var Wd;
function tryFallAt(x,y)
{
  var d=false;
  var o=Oj[x][y];
  if(o.color==0)
  {
    return true;
  }
  else
  {
    if((o.dir==0 || o.pos<=0) && !Wd[x][y])
    {
      Wd[x][y]=true;
      switch(Down[x][y])
      {
        case 1:
          d=tryFallAt(x,y+1);
          break;
        case 2:
          d=tryFallAt(x,y-1);
          break;
        case 3:
          d=tryFallAt(x+1,y);
          break;
        case 4:
          d=tryFallAt(x-1,y);
          break;
        default:
          d=false;
          break;
      }
      if(d)
      {
        if(o.dir==0)
        {
          o.speed=2;
          o.pos=500-o.speed;
        }
        else
        {
          o.pos+=500;
        }
        o.dir=Down[x][y];
        Oj[x][y]={'pos':0,'speed':0,'dir':0,'color':0};
        switch(Down[x][y])
        {
          case 1:
            Oj[x][y+1]=o;
            break;
          case 2:
            Oj[x][y-1]=o;
            break;
          case 3:
            Oj[x+1][y]=o;
            break;
          case 4:
            Oj[x-1][y]=o;
            break;
          default:
            break;
        }
        return true;
      }
    }
  }
  return false;
}

function fall()
{
  var i,j;
  Wd=[];
  for(i=0;i<board.width;i++)
  {
    Wd.push([]);
    for(j=0;j<board.height;j++)
    {
      if(Oj[i][j].dir!=0)
      {
        Oj[i][j].speed+=2;
        if(Oj[i][j].speed>500) Oj[i][j].speed=500;
        Oj[i][j].pos-=Oj[i][j].speed;
      }
      Wd[i].push(false);
    }
  }
  for(i=0;i<board.width;i++)
  {
    for(j=0;j<board.height;j++)
    {
      tryFallAt(i,j);
    }
  }
  for(i=0;i<board.width;i++)
  {
    for(j=0;j<board.height;j++)
    {
      if(Down[i][j]==1 && Oj[i][j].pos<=0 && (j==8 || Oj[i][j+1].color!=0))
      {
        Oj[i][j].dir=0;
        Oj[i][j].speed=0;
        Oj[i][j].pos=0;
      }
      if(Down[i][j]==2 && Oj[i][j].pos<=0 && (j==0 || Oj[i][j-1].color!=0))
      {
        Oj[i][j].dir=0;
        Oj[i][j].speed=0;
        Oj[i][j].pos=0;
      }
      if(Down[i][j]==3 && Oj[i][j].pos<=0 && (i==8 || Oj[i+1][j].color!=0))
      {
        Oj[i][j].dir=0;
        Oj[i][j].speed=0;
        Oj[i][j].pos=0;
      }
      if(Down[i][j]==4 && Oj[i][j].pos<=0 && (i==0 || Oj[i-1][j].color!=0))
      {
        Oj[i][j].dir=0;
        Oj[i][j].speed=0;
        Oj[i][j].pos=0;
      }
      if(Down[i][j]==0 && Oj[i][j].pos<=0)
      {
        Oj[i][j].dir=0;
        Oj[i][j].speed=0;
        Oj[i][j].pos=0;
      }
    }
  }
}

function match3()
{
  var i,j;
  var arr=[];
  for(i=0;i<9;i++)
  {
    for(j=0;j<7;j++)
    {
      var c=Oj[i][j].color;
      if(c>0 && Oj[i][j].dir==0)
      {
        if(Oj[i][j+1].color==c && Oj[i][j+2].color==c
          && Oj[i][j+1].dir==0 && Oj[i][j+2].dir==0)
        {
          arr.push([i,j],[i,j+1],[i,j+2]);
          j+=3;
          while(j<9 && Oj[i][j].color==c && Oj[i][j].dir==0)
          {
            arr.push([i,j]);
            j++;
          }
        }
      }
    }
  }
  for(i=0;i<9;i++)
  {
    for(j=0;j<7;j++)
    {
      var c=Oj[j][i].color;
      if(c>0)
      {
        if(Oj[j+1][i].color==c && Oj[j+2][i].color==c
        && Oj[j+1][i].dir==0 && Oj[j+2][i].dir==0)
        {
          Oj[j][i].color=0;
          Oj[j+1][i].color=0;
          Oj[j+2][i].color=0;
          j+=3;
          while(j<9 && Oj[j][i].color==c && Oj[j][i].dir==0)
          {
            Oj[j][i].color=0;
            j++;
          }
        }
      }
    }
  }
  for(i=0;i<arr.length;i++)
    Oj[arr[i][0]][arr[i][1]].color=0;
}
randomize();
onmessage = function(e){
  var d = e.data;
  if (d == 'next') {
    fall();
    match3();
    postMessage([Oj, Down]);
  }
  else if (d == 'current') {
    postMessage([Oj, Down]);
  }
  else {
    if (d[0] == 'setColor') {
      Oj[d[1]][d[2]].color = d[3];
    }
    else if (d[0] == 'setG') {
      if (d[3] == 1 && d[2] >= 8) return;
      if (d[3] == 2 && d[2] < 1) return;
      if (d[3] == 3 && d[1] >= 8) return;
      if (d[3] == 4 && d[1] < 1) return;
      Down[d[1]][d[2]] = d[3];
    }
  }
};
