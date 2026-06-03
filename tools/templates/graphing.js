function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function pick(a){return a[rand(0,a.length-1)];}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=rand(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){const t=a%b;a=b;b=t;}return a||1;}
function fracStr(n,d){const g=gcd(n,d);return (n/g)+"/"+(d/g);}
function fmt(x){return Number(x.toFixed(6)).toString();}
function parn(x){return x<0?"("+x+")":""+x;}
function snz(min,max){return pick([-1,1])*rand(min,max);}
function withSign(x){return x<0?"− "+Math.abs(x):"+ "+x;}
const SUP={2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸"};
function typed(q,ans,explain,ph){const a=String(ans);const accept=[a];if(a.indexOf("0.")===0)accept.push(a.slice(1));return {type:"typed",q:q,accept:accept,explain:explain,placeholder:ph||"Type a number"};}
function typedFrac(q,raw,simp,explain){const accept=[simp];if(accept.indexOf(raw)===-1)accept.push(raw);return {type:"typed",q:q,accept:accept,explain:explain,placeholder:"Type a fraction (like a/b)"};}
function mcNum(q,answer,distractors,explain){const set=[answer];(distractors||[]).forEach(d=>{if(set.indexOf(d)===-1&&d!==answer)set.push(d);});let g=0;while(set.length<4&&g<200){const c=answer+pick([-10,-5,-3,-2,-1,1,2,3,4,5,10]);if(set.indexOf(c)===-1)set.push(c);g++;}const choices=shuffle(set.slice(0,4)).map(String);return {type:"mc",q:q,choices:choices,answer:choices.indexOf(String(answer)),explain:explain};}
function mcText(q,choices,correct,explain){const sh=shuffle(choices);return {type:"mc",q:q,choices:sh,answer:sh.indexOf(correct),explain:explain};}

// ---------- helpers shared by templates ----------
function pt(){let x=snz(1,8),y=snz(1,8);return [x,y];}
function quadrant(x,y){if(x>0&&y>0)return "Quadrant I";if(x<0&&y>0)return "Quadrant II";if(x<0&&y<0)return "Quadrant III";return "Quadrant IV";}

const TIERS = [

// =================== MEDIUM (grade 6) ===================
[
  // 1. identify x or y coordinate
  function(){const [x,y]=pt();const which=pick(["x","y"]);const v=which==="x"?x:y;
    return mcNum("In the ordered pair ("+x+", "+y+"), what is the "+which+"-coordinate?",v,[which==="x"?y:x,-v],
      "An ordered pair is written (x, y). The "+which+"-coordinate is "+v+".");},
  // 2. which quadrant
  function(){let [x,y]=pt();const ans=quadrant(x,y);
    return mcText("In which quadrant is the point ("+x+", "+y+")?",["Quadrant I","Quadrant II","Quadrant III","Quadrant IV"],ans,
      "x is "+(x>0?"positive":"negative")+" and y is "+(y>0?"positive":"negative")+", so the point is in "+ans+".");},
  // 3. which axis a point is on
  function(){const axis=pick(["x","y"]);let x,y;if(axis==="x"){x=snz(1,8);y=0;}else{x=0;y=snz(1,8);}
    const ans=axis==="x"?"x-axis":"y-axis";
    return mcText("The point ("+x+", "+y+") lies on which axis?",["x-axis","y-axis","Both axes (the origin)","Neither axis"],ans,
      "A point with "+(axis==="x"?"y = 0":"x = 0")+" lies on the "+ans+".");},
  // 4. plot directions from origin
  function(){let x=rand(1,7),y=rand(1,7);
    return mcText("Starting at the origin (0, 0), how do you reach the point ("+x+", "+y+")?",
      ["Right "+x+", up "+y,"Up "+x+", right "+y,"Left "+x+", up "+y,"Right "+x+", down "+y],"Right "+x+", up "+y,
      "The first number moves you right "+x+" (along x). The second moves you up "+y+" (along y).");},
  // 5. distance on a horizontal line
  function(){const y=snz(1,6);let a=snz(1,8),b=snz(1,8);while(b===a)b=snz(1,8);const d=Math.abs(a-b);
    return mcNum("How far apart are the points ("+a+", "+y+") and ("+b+", "+y+")?",d,[d+1,d-1>0?d-1:d+2],
      "They share the same y, so count along the horizontal line: |"+a+" − "+b+"| = "+d+" units.");},
  // 6. distance on a vertical line
  function(){const x=snz(1,6);let a=snz(1,8),b=snz(1,8);while(b===a)b=snz(1,8);const d=Math.abs(a-b);
    return mcNum("How far apart are the points ("+x+", "+a+") and ("+x+", "+b+")?",d,[d+1,d+2],
      "They share the same x, so count along the vertical line: |"+a+" − "+b+"| = "+d+" units.");},
  // 7. reflect over x-axis
  function(){let x=snz(1,8),y=snz(1,8);while(Math.abs(x)===Math.abs(y))y=snz(1,8);
    return mcText("Reflect the point ("+x+", "+y+") over the x-axis. What are its new coordinates?",
      ["("+x+", "+(-y)+")","("+(-x)+", "+y+")","("+(-x)+", "+(-y)+")","("+y+", "+x+")"],"("+x+", "+(-y)+")",
      "Reflecting over the x-axis keeps x the same and flips the sign of y: ("+x+", "+(-y)+").");},
  // 8. reflect over y-axis
  function(){let x=snz(1,8),y=snz(1,8);while(Math.abs(x)===Math.abs(y))y=snz(1,8);
    return mcText("Reflect the point ("+x+", "+y+") over the y-axis. What are its new coordinates?",
      ["("+(-x)+", "+y+")","("+x+", "+(-y)+")","("+(-x)+", "+(-y)+")","("+y+", "+x+")"],"("+(-x)+", "+y+")",
      "Reflecting over the y-axis keeps y the same and flips the sign of x: ("+(-x)+", "+y+").");},
  // 9. simple "a number ... result is" reverse
  function(){const k=rand(2,9),r=rand(5,30);
    return typed("A number increased by "+k+" gives "+(r)+". What is the number?",r-k,
      "Let the number be n. n + "+k+" = "+r+", so n = "+r+" − "+k+" = "+(r-k)+".");},
  // 10. total then subtract word problem
  function(){const total=rand(20,40),used=rand(5,total-3);
    return typed("Maria had "+total+" stickers and gave away "+used+". How many stickers does she have left?",total-used,
      total+" − "+used+" = "+(total-used)+" stickers.");},
  // 11. perimeter word problem (rectangle)
  function(){const L=rand(4,12),W=rand(2,L-1);const p=2*(L+W);
    return typed("A rectangle is "+L+" cm long and "+W+" cm wide. What is its perimeter in cm?",p,
      "Perimeter = 2(L + W) = 2("+L+" + "+W+") = 2("+(L+W)+") = "+p+" cm.");},
  // 12. consecutive integers (find smaller)
  function(){const n=rand(5,40);const sum=n+(n+1);
    return typed("Two consecutive integers add up to "+sum+". What is the smaller integer?",n,
      "Let them be n and n+1. n + (n+1) = "+sum+", so 2n + 1 = "+sum+", 2n = "+(sum-1)+", n = "+n+".");},
],

// =================== HARD (placement bar) ===================
[
  // 1. quadrant after a transformation
  function(){let [x,y]=pt();const nx=-x,ny=-y;const ans=quadrant(nx,ny);
    return mcText("Point P is at ("+x+", "+y+"). If both coordinates are multiplied by −1, in which quadrant is the new point?",
      ["Quadrant I","Quadrant II","Quadrant III","Quadrant IV"],ans,
      "Negating both gives ("+nx+", "+ny+"), which lies in "+ans+".");},
  // 2. distance — pick perimeter-ish multi-segment (same line)
  function(){const y=snz(1,5);const a=-rand(1,6),b=rand(1,6);const d=b-a;
    return typed("A segment runs from ("+a+", "+y+") to ("+b+", "+y+"). What is its length?",d,
      "Same y, so length = "+b+" − ("+a+") = "+d+" units.");},
  // 3. reflect over both axes (point symmetry through origin)
  function(){let x=snz(1,8),y=snz(1,8);while(Math.abs(x)===Math.abs(y))y=snz(1,8);
    return mcText("Point ("+x+", "+y+") is reflected over the x-axis and then over the y-axis. Where does it land?",
      ["("+(-x)+", "+(-y)+")","("+x+", "+(-y)+")","("+(-x)+", "+y+")","("+y+", "+x+")"],"("+(-x)+", "+(-y)+")",
      "Reflect over x-axis: ("+x+", "+(-y)+"). Then over y-axis: ("+(-x)+", "+(-y)+").");},
  // 4. midpoint on a line (integer)
  function(){const y=snz(1,5);let a=snz(1,8),b=snz(1,8);if((a+b)%2!==0)b+=(b<8?1:-1);if((a+b)%2!==0)a+=1;const m=(a+b)/2;
    return typed("The endpoints of a horizontal segment are ("+a+", "+y+") and ("+b+", "+y+"). What is the x-coordinate of its midpoint?",m,
      "Midpoint x = ("+a+" + "+b+") / 2 = "+(a+b)+" / 2 = "+m+".");},
  // 5. set up equation word problem (two-step)
  function(){const each=rand(3,8),base=rand(5,20),n=rand(3,9);const total=each*n+base;
    return typed("A taxi charges $"+base+" plus $"+each+" per mile. A ride costs $"+total+". How many miles was the ride?",n,
      "Let m = miles. "+each+"m + "+base+" = "+total+". So "+each+"m = "+(total-base)+", m = "+(total-base)+" / "+each+" = "+n+".");},
  // 6. age problem
  function(){const diff=rand(3,12),younger=rand(6,20);const older=younger+diff;const sum=younger+older;
    return typed("Tom is "+diff+" years older than Sam. Together their ages total "+sum+". How old is Sam?",younger,
      "Let Sam = s. Then Tom = s + "+diff+". s + (s + "+diff+") = "+sum+", 2s = "+(sum-diff)+", s = "+younger+".");},
  // 7. "a number" reverse, two-step
  function(){const m=rand(2,6),add=rand(1,12),r=m*rand(3,9)+add;const n=(r-add)/m;
    return typed("When a number is multiplied by "+m+" and then "+add+" is added, the result is "+r+". What is the number?",n,
      "Let the number be n. "+m+"n + "+add+" = "+r+". So "+m+"n = "+(r-add)+", n = "+(r-add)+" / "+m+" = "+n+".");},
  // 8. consecutive even integers
  function(){const start=2*rand(2,15);const sum=start+(start+2)+(start+4);
    return typed("Three consecutive even integers add up to "+sum+". What is the smallest one?",start,
      "Let them be n, n+2, n+4. Their sum is 3n + 6 = "+sum+", so 3n = "+(sum-6)+", n = "+start+".");},
  // 9. perimeter reverse (find side)
  function(){const W=rand(3,9);const p=2*rand(10,18);const L=p/2-W;if(L<1)return mcNum("placeholder",1,[2,3,4],"x");
    return typed("A rectangle has perimeter "+p+" cm and width "+W+" cm. What is its length in cm?",L,
      "Perimeter = 2(L + W), so 2(L + "+W+") = "+p+". L + "+W+" = "+(p/2)+", L = "+(p/2-W)+" cm.");},
  // 10. total then split (multi-step)
  function(){const total=rand(40,90);let kept=rand(4,15);const friends=rand(2,5);
    while((total-kept)%friends!==0)kept++;const each=(total-kept)/friends;
    return typed("Ben had "+total+" marbles. He kept "+kept+" and split the rest equally among "+friends+" friends. How many did each friend get?",each,
      "Rest = "+total+" − "+kept+" = "+(total-kept)+". Split among "+friends+": "+(total-kept)+" / "+friends+" = "+each+".");},
  // 11. which axis after move
  function(){const start=snz(1,8);const move=start;const dir=start>0?"left":"right";
    return mcText("A point at ("+start+", 4) is moved "+Math.abs(move)+" units "+dir+". Which axis does it land on?",
      ["y-axis","x-axis","Neither","The origin"],"y-axis",
      "Moving "+Math.abs(move)+" units "+dir+" changes x from "+start+" to 0, so the point lands on the y-axis.");},
  // 12. distance between point and its reflection
  function(){let [x,y]=pt();const over=pick(["x","y"]);const d=over==="x"?2*Math.abs(y):2*Math.abs(x);
    return typed("Point ("+x+", "+y+") is reflected over the "+over+"-axis. How far apart are the point and its image?",d,
      "Reflecting over the "+over+"-axis moves the point to twice its distance from that axis: 2 × "+(over==="x"?Math.abs(y):Math.abs(x))+" = "+d+" units.");},
],

// =================== CHALLENGING (beyond test) ===================
[
  // 1. triangle area on grid (right triangle, axis-aligned legs)
  function(){const b=rand(4,12),h=rand(3,11);const a=b*h/2;const num=b*h;const isInt=num%2===0;
    if(isInt) return typed("A right triangle has its right angle at the origin, one leg "+b+" units along the x-axis and the other "+h+" units along the y-axis. What is its area (square units)?",num/2,
      "Area = (1/2) × base × height = (1/2) × "+b+" × "+h+" = "+(num/2)+" square units.");
    return typedFrac("A right triangle has its right angle at the origin, one leg "+b+" units along the x-axis and the other "+h+" units along the y-axis. What is its area (square units)?",num+"/2",fracStr(num,2),
      "Area = (1/2) × "+b+" × "+h+" = "+num+"/2 = "+fracStr(num,2)+" square units.");},
  // 2. rectangle area from 4 corner points
  function(){const x1=snz(1,5),x2=x1+rand(2,6);const y1=snz(1,5),y2=y1+rand(2,6);const A=(x2-x1)*(y2-y1);
    return typed("A rectangle has corners ("+x1+", "+y1+"), ("+x2+", "+y1+"), ("+x2+", "+y2+"), and ("+x1+", "+y2+"). What is its area in square units?",A,
      "Width = "+x2+" − "+x1+" = "+(x2-x1)+". Height = "+y2+" − "+y1+" = "+(y2-y1)+". Area = "+(x2-x1)+" × "+(y2-y1)+" = "+A+".");},
  // 3. taxicab distance (L-shaped)
  function(){let x1=snz(1,6),y1=snz(1,6),x2=snz(1,6),y2=snz(1,6);while(x2===x1)x2=snz(1,6);while(y2===y1)y2=snz(1,6);
    const d=Math.abs(x2-x1)+Math.abs(y2-y1);
    return typed("To travel from ("+x1+", "+y1+") to ("+x2+", "+y2+") you may only move along grid lines (horizontally and vertically). What is the shortest such distance?",d,
      "Horizontal change |"+x2+" − "+x1+"| = "+Math.abs(x2-x1)+", vertical change |"+y2+" − "+y1+"| = "+Math.abs(y2-y1)+". Total = "+d+" units.");},
  // 4. consecutive odd integers (largest)
  function(){const start=2*rand(2,12)+1;const sum=start+(start+2)+(start+4)+(start+6);const largest=start+6;
    return typed("Four consecutive odd integers add up to "+sum+". What is the largest one?",largest,
      "Let them be n, n+2, n+4, n+6. Sum = 4n + 12 = "+sum+", so 4n = "+(sum-12)+", n = "+start+". Largest = "+largest+".");},
  // 5. age problem in the future
  function(){const ageNow=rand(8,16),yrs=rand(3,8);const mult=pick([2,3]);
    // In yrs years, parent = mult * child. Set child now = ageNow, find parent now.
    const childFuture=ageNow+yrs;const parentFuture=mult*childFuture;const parentNow=parentFuture-yrs;
    return typed("A child is "+ageNow+" years old. In "+yrs+" years, a parent will be "+mult+" times as old as the child is then. How old is the parent now?",parentNow,
      "In "+yrs+" years the child is "+childFuture+", so the parent will be "+mult+" × "+childFuture+" = "+parentFuture+". Now the parent is "+parentFuture+" − "+yrs+" = "+parentNow+".");},
  // 6. coin / value word problem
  function(){const dimes=rand(4,12),extraQ=rand(2,8);const quarters=dimes+extraQ;const cents=dimes*10+quarters*25;
    return typed("A jar has some dimes and "+extraQ+" more quarters than dimes. If there are "+dimes+" dimes, what is the total value in cents?",cents,
      "Quarters = "+dimes+" + "+extraQ+" = "+quarters+". Value = "+dimes+"×10 + "+quarters+"×25 = "+(dimes*10)+" + "+(quarters*25)+" = "+cents+" cents.");},
  // 7. reflection composition gives translation/quadrant reasoning
  function(){let [x,y]=pt();// reflect over y=x  -> (y,x)
    return mcText("If point ("+x+", "+y+") is reflected over the line y = x, what are its new coordinates?",
      ["("+y+", "+x+")","("+x+", "+(-y)+")","("+(-x)+", "+y+")","("+(-y)+", "+(-x)+")"],"("+y+", "+x+")",
      "Reflecting over the line y = x swaps the coordinates: ("+x+", "+y+") becomes ("+y+", "+x+").");},
  // 8. distance covered there-and-back rate problem
  function(){const rate=rand(3,8),hrs=rand(2,6);const oneWay=rate*hrs;const round=2*oneWay;
    return typed("A cyclist rides at "+rate+" miles per hour for "+hrs+" hours to reach a park, then rides the same route home. What is the total distance in miles?",round,
      "One way = "+rate+" × "+hrs+" = "+oneWay+" miles. Round trip = 2 × "+oneWay+" = "+round+" miles.");},
  // 9. set up equation: equal in n steps
  function(){const bStart=rand(5,30);const aRate=rand(2,5),bRate=aRate+rand(2,5);const gap=aRate+bRate;
    // choose n directly so the meeting time is a clean integer
    const n=rand(3,9);const a0=bStart+gap*n;
    return typed("Tank A holds "+a0+" liters and loses "+aRate+" liters each hour. Tank B holds "+bStart+" liters and gains "+bRate+" liters each hour. After how many hours do they hold the same amount?",n,
      a0+" − "+aRate+"h = "+bStart+" + "+bRate+"h. So "+a0+" − "+bStart+" = ("+bRate+" + "+aRate+")h, "+(a0-bStart)+" = "+gap+"h, h = "+n+".");},
  // 10. number puzzle: digit / reverse style (sum & difference)
  function(){const sum=rand(20,60);let d=rand(2,18);if((sum+d)%2!==0){d+=1;}const big=(sum+d)/2,small=(sum-d)/2;
    return typed("Two numbers have a sum of "+sum+" and a difference of "+d+". What is the larger number?",big,
      "Larger = (sum + difference) / 2 = ("+sum+" + "+d+") / 2 = "+(sum+d)+" / 2 = "+big+".");},
  // 11. average / mean word problem (find missing)
  function(){const n=rand(3,5);const mean=rand(70,90);const total=mean*n;const knownCount=n-1;
    const knowns=[];let s=0;for(let i=0;i<knownCount;i++){const v=rand(60,95);knowns.push(v);s+=v;}const missing=total-s;
    if(missing<0||missing>100)return typed("The average of "+n+" test scores is "+mean+". "+knownCount+" of them are "+knowns.join(", ")+". What is the remaining score?",missing,"x");
    return typed("The average of "+n+" test scores is "+mean+". "+knownCount+" of them are "+knowns.join(", ")+". What is the remaining score?",missing,
      "Total needed = "+mean+" × "+n+" = "+total+". Known sum = "+s+". Missing = "+total+" − "+s+" = "+missing+".");},
  // 12. quadrant of midpoint
  function(){let x1,y1,x2,y2,mx,my;do{x1=snz(2,8);y1=snz(2,8);x2=snz(2,8);y2=snz(2,8);mx=x1+x2;my=y1+y2;}while(mx===0||my===0);
    const ans=quadrant(mx,my);
    return mcText("In which quadrant is the midpoint of the segment from ("+x1+", "+y1+") to ("+x2+", "+y2+")?",
      ["Quadrant I","Quadrant II","Quadrant III","Quadrant IV"],ans,
      "Midpoint = (("+x1+"+"+x2+")/2, ("+y1+"+"+y2+")/2) = ("+fmt((x1+x2)/2)+", "+fmt((y1+y2)/2)+"), which is in "+ans+".");},
],

];

if (require.main === module) {
  let bad=0,total=0;
  TIERS.forEach((tier,ti)=>tier.forEach((fn,fi)=>{ const seen=new Set(); for(let k=0;k<80;k++){ const q=fn(); total++;
    if(!q.q||q.explain==null||!q.type){bad++;console.log("STRUCT t"+ti+" f"+fi,JSON.stringify(q));continue;}
    if(q.type==="mc"){ if(!Array.isArray(q.choices)||q.choices.length<2||q.answer<0||q.answer>=q.choices.length||new Set(q.choices).size!==q.choices.length){bad++;console.log("MC t"+ti+" f"+fi,JSON.stringify(q));} }
    else { if(!q.accept.length||/undefined|NaN/.test(q.q+q.accept[0])){bad++;console.log("TYPED t"+ti+" f"+fi,JSON.stringify(q));} }
    seen.add(q.q); }
    if(seen.size<6) console.log("LOW-VARIETY t"+ti+" f"+fi+" only "+seen.size+" unique"); }));
  console.log("tier sizes:",TIERS.map(t=>t.length),"checked",total,"problems",bad);
}
module.exports = TIERS;
