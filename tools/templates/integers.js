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

const TIERS = [
  [ /* MEDIUM */
    // 1. add two signed integers
    function(){const a=snz(2,15),b=snz(2,15);const ans=a+b;return typed("Compute: "+parn(a)+" + "+parn(b)+".",ans,parn(a)+" + "+parn(b)+" = "+ans+".");},
    // 2. subtract a negative
    function(){const a=rand(2,15),b=rand(2,15);const ans=a-(-b);return typed("Compute: "+a+" − ("+(-b)+").",ans,"Subtracting a negative adds: "+a+" + "+b+" = "+ans+".");},
    // 3. multiply two signed integers
    function(){const a=snz(2,12),b=snz(2,9);const ans=a*b;return typed("Compute: "+parn(a)+" × "+parn(b)+".",ans,"Signs: "+(a*b>=0?"like signs give positive":"unlike signs give negative")+". "+Math.abs(a)+"×"+Math.abs(b)+" = "+Math.abs(ans)+", so "+ans+".");},
    // 4. divide two signed integers (clean)
    function(){const b=snz(2,9);const q=snz(2,9);const a=b*q;const ans=a/b;return typed("Compute: "+parn(a)+" ÷ "+parn(b)+".",ans,parn(a)+" ÷ "+parn(b)+" = "+ans+" (signs "+(ans>=0?"alike":"unlike")+").");},
    // 5. absolute value single
    function(){const a=snz(2,20);return typed("Evaluate |"+a+"|.",Math.abs(a),"Absolute value is distance from 0: |"+a+"| = "+Math.abs(a)+".");},
    // 6. compare two integers
    function(){let a,b;do{a=snz(1,20);b=snz(1,20);}while(a===b);const greater=a>b?a:b;return mcText("Which integer is greater: "+a+" or "+b+"?",[String(a),String(b)],String(greater),"On a number line, "+greater+" is farther right, so "+greater+" > "+(a===greater?b:a)+".");},
    // 7. order three integers - pick smallest
    function(){const set=[];while(set.length<3){const v=snz(1,20);if(set.indexOf(v)===-1)set.push(v);}const smallest=Math.min.apply(null,set);return mcText("Which is the SMALLEST: "+set.join(", ")+"?",set.map(String),String(smallest),"Most negative / farthest left is smallest: "+smallest+".");},
    // 8. add three signed integers
    function(){const a=snz(2,12),b=snz(2,12),c=snz(2,12);const ans=a+b+c;return typed("Compute: "+parn(a)+" + "+parn(b)+" + "+parn(c)+".",ans,"Work left to right: "+parn(a)+"+"+parn(b)+" = "+(a+b)+", then +"+parn(c)+" = "+ans+".");},
    // 9. temperature change word problem
    function(){const start=snz(2,15);const drop=rand(3,20);const ans=start-drop;return typed("The temperature is "+start+"°. It drops "+drop+" degrees. What is the new temperature?",ans,start+" − "+drop+" = "+ans+"°.");},
    // 10. bank balance word problem
    function(){const start=rand(20,80);const spend=rand(start+5,start+40);const ans=start-spend;return typed("An account has $"+start+". A purchase of $"+spend+" is made (overdraft allowed). What is the new balance, in dollars?",ans,start+" − "+spend+" = "+ans+".");},
    // 11. opposite / additive inverse
    function(){const a=snz(2,20);const ans=-a;return typed("What is the opposite (additive inverse) of "+a+"?",ans,"The opposite of "+a+" is "+ans+", since "+a+" + ("+ans+") = 0.");},
    // 12. subtract two integers both negative
    function(){const a=snz(2,15),b=snz(2,15);const ans=a-b;return typed("Compute: "+parn(a)+" − "+parn(b)+".",ans,parn(a)+" − "+parn(b)+" = "+a+" "+withSign(-b)+" = "+ans+".");}
  ],
  [ /* HARD */
    // 1. |a - b|
    function(){let a,b;do{a=snz(2,15);b=snz(2,15);}while(a===b);const ans=Math.abs(a-b);return typed("Evaluate |"+parn(a)+" − "+parn(b)+"|.",ans,parn(a)+" − "+parn(b)+" = "+(a-b)+", and |"+(a-b)+"| = "+ans+".");},
    // 2. order of ops with negatives (mult then add)
    function(){const a=snz(2,9),b=snz(2,9),c=snz(2,9);const ans=a+b*c;return typed("Evaluate: "+parn(a)+" + "+parn(b)+" × "+parn(c)+".",ans,"Multiply first: "+parn(b)+"×"+parn(c)+" = "+(b*c)+". Then "+parn(a)+" + "+(b*c)+" = "+ans+".");},
    // 3. power of a negative base
    function(){const base=snz(2,6);const e=pick([2,3]);const ans=Math.pow(base,e);return typed("Evaluate ("+base+")"+SUP[e]+".",ans,"("+base+")"+SUP[e]+" = "+Array(e).fill(parn(base)).join("·")+" = "+ans+".");},
    // 4. negative of a square vs square of negative
    function(){const base=rand(2,9);const ans=-(base*base);return typed("Evaluate −"+base+SUP[2]+". (Note: the exponent applies before the negative sign.)",ans,"−"+base+SUP[2]+" = −("+base+"·"+base+") = "+ans+".");},
    // 5. evaluate kx + b at negative x
    function(){const k=snz(2,6),b=snz(2,9),x=snz(2,6);const ans=k*x+b;return typed("Evaluate "+k+"x "+withSign(b)+" when x = "+x+".",ans,k+"("+x+") = "+(k*x)+"; "+(k*x)+" "+withSign(b)+" = "+ans+".");},
    // 6. evaluate kx^2 at negative x
    function(){const k=snz(1,4),x=snz(2,5);const ans=k*x*x;return typed("Evaluate "+(k===1?"":k===-1?"−":k)+"x"+SUP[2]+" when x = "+x+".",ans,"x"+SUP[2]+" = ("+x+")"+SUP[2]+" = "+(x*x)+"; times "+k+" = "+ans+".");},
    // 7. distribute with negatives a(b - c)
    function(){const a=snz(2,7),b=snz(2,9),c=snz(2,9);const ans=a*(b-c);return typed("Evaluate "+parn(a)+"("+parn(b)+" − "+parn(c)+").",ans,"Inside: "+parn(b)+"−"+parn(c)+" = "+(b-c)+". Then "+parn(a)+"×"+(b-c)+" = "+ans+".");},
    // 8. three-term mult/div chain (divisibility guaranteed)
    function(){const c=snz(2,5);const q=snz(2,6);const a=c*q;const b=snz(2,6);const step1=a/c;const ans=step1*b;return typed("Compute: "+parn(a)+" ÷ "+parn(c)+" × "+parn(b)+".",ans,"Left to right: "+parn(a)+" ÷ "+parn(c)+" = "+step1+"; × "+parn(b)+" = "+ans+".");},
    // 9. order of ops: a - b(c - d)
    function(){const a=snz(2,12),b=snz(2,6),c=snz(2,7),d=snz(2,7);const ans=a-b*(c-d);return typed("Evaluate "+parn(a)+" − "+parn(b)+"("+parn(c)+" − "+parn(d)+").",ans,"Inside: "+parn(c)+"−"+parn(d)+" = "+(c-d)+". Then "+parn(b)+"×"+(c-d)+" = "+(b*(c-d))+". So "+parn(a)+" − "+parn(b*(c-d))+" = "+ans+".");},
    // 10. elevation word problem (signed)
    function(){const start=snz(50,300);const change=snz(20,200);const ans=start+change;return typed("A hiker is at elevation "+start+" m relative to sea level, then changes by "+parn(change)+" m. What is the new elevation, in meters?",ans,start+" "+withSign(change)+" = "+ans+".");},
    // 11. two numbers given product and sum (find them, ask for the smaller)
    function(){const r1=snz(2,8);let r2;do{r2=snz(2,8);}while(r2===r1);const s=r1+r2,p=r1*r2;const small=Math.min(r1,r2);return typed("Two integers have a sum of "+s+" and a product of "+p+". What is the smaller of the two integers?",small,"The integers are "+r1+" and "+r2+" (sum "+s+", product "+p+"). The smaller is "+small+".");},
    // 12. mean of signed integers (clean)
    function(){const n=pick([2,3,4]);const mean=snz(1,8);const vals=[];let sum=0;for(let i=0;i<n-1;i++){const v=snz(2,12);vals.push(v);sum+=v;}vals.push(mean*n-sum);return typed("Find the mean (average) of: "+vals.join(", ")+".",mean,"Sum = "+vals.reduce((a,b)=>a+b,0)+"; ÷ "+n+" = "+mean+".");}
  ],
  [ /* CHALLENGING */
    // 1. nested order of ops with negatives and exponent
    function(){const a=snz(2,5),b=snz(2,4),c=snz(2,5);const ans=a*a-b*c;return typed("Evaluate ("+a+")"+SUP[2]+" − "+parn(b)+"("+parn(c)+").",ans,"("+a+")"+SUP[2]+" = "+(a*a)+"; "+parn(b)+"×"+parn(c)+" = "+(b*c)+"; "+(a*a)+" − "+parn(b*c)+" = "+ans+".");},
    // 2. evaluate ax^2 + bx + c at negative x
    function(){const a=snz(1,3),b=snz(2,6),c=snz(2,9),x=snz(2,4);const ans=a*x*x+b*x+c;return typed("Evaluate "+(a===1?"":a===-1?"−":a)+"x"+SUP[2]+" "+withSign(b)+"x "+withSign(c)+" when x = "+x+".",ans,a+"("+x+")"+SUP[2]+" = "+(a*x*x)+"; "+b+"("+x+") = "+(b*x)+"; plus "+c+" = "+ans+".");},
    // 3. nested brackets
    function(){const a=snz(3,12),b=snz(2,6),c=snz(2,6),d=snz(2,5);const inner=c-d;const ans=a-b*inner;return typed("Evaluate "+parn(a)+" − "+parn(b)+"["+parn(c)+" − "+parn(d)+"].",ans,"Brackets: "+parn(c)+"−"+parn(d)+" = "+inner+". "+parn(b)+"×"+inner+" = "+(b*inner)+". "+parn(a)+" − "+parn(b*inner)+" = "+ans+".");},
    // 4. distribute and combine: a(x - b) at value, two-step
    function(){const a=snz(2,5),b=snz(2,6),x=snz(2,6);const ans=a*x-a*b;return typed("Distribute and evaluate "+parn(a)+"(x − "+parn(b)+") when x = "+x+".",ans,parn(a)+"("+x+" − "+parn(b)+") = "+parn(a)+"("+(x-b)+") = "+ans+".");},
    // 5. sum of integers from -n to n shifted
    function(){const a=snz(3,8);const b=a+rand(2,5);let sum=0;for(let i=Math.min(a,b);i<=Math.max(a,b);i++)sum+=i;return typed("Find the sum of all integers from "+Math.min(a,b)+" to "+Math.max(a,b)+", inclusive.",sum,"Add consecutive integers "+Math.min(a,b)+" through "+Math.max(a,b)+": sum = "+sum+".");},
    // 6. power of negative inside larger expression
    function(){const base=snz(2,4);const ans=Math.pow(base,3)+rand(2,10);const add=ans-Math.pow(base,3);return typed("Evaluate ("+base+")"+SUP[3]+" + "+add+".",ans,"("+base+")"+SUP[3]+" = "+Math.pow(base,3)+"; + "+add+" = "+ans+".");},
    // 7. two-variable expression at signed values
    function(){const x=snz(2,6),y=snz(2,6);const ans=2*x-3*y;return typed("Evaluate 2x − 3y when x = "+x+" and y = "+y+".",ans,"2("+x+") = "+(2*x)+"; 3("+y+") = "+(3*y)+"; "+(2*x)+" − "+parn(3*y)+" = "+ans+".");},
    // 8. |a| - |b| trap
    function(){const a=snz(5,20),b=snz(5,20);const ans=Math.abs(a)-Math.abs(b);return typed("Evaluate |"+parn(a)+"| − |"+parn(b)+"|.",ans,"|"+parn(a)+"| = "+Math.abs(a)+"; |"+parn(b)+"| = "+Math.abs(b)+"; "+Math.abs(a)+" − "+Math.abs(b)+" = "+ans+".");},
    // 9. multi-step real world: bank with multiple transactions
    function(){const start=rand(40,100);const d1=-rand(10,40),d2=rand(10,50),d3=-rand(10,40);const ans=start+d1+d2+d3;return typed("Balance starts at $"+start+". Transactions: "+parn(d1)+", "+parn(d2)+", "+parn(d3)+". What is the final balance, in dollars?",ans,start+" "+withSign(d1)+" "+withSign(d2)+" "+withSign(d3)+" = "+ans+".");},
    // 10. order of ops with division and negative, clean
    function(){const q=snz(2,6);const b=snz(2,5);const a=q*b;const c=snz(2,8);const ans=a/b+c;return typed("Evaluate "+parn(a)+" ÷ "+parn(b)+" + "+parn(c)+".",ans,parn(a)+" ÷ "+parn(b)+" = "+(a/b)+"; + "+parn(c)+" = "+ans+".");},
    // 11. consecutive-integer puzzle
    function(){const first=snz(2,12);const sum=first+(first+1)+(first+2);return typed("Three consecutive integers add up to "+sum+". What is the smallest of them?",first,"If the smallest is n, then n + (n+1) + (n+2) = "+sum+", so 3n + 3 = "+sum+", n = "+first+".");},
    // 12. distribute two negatives then combine: -a(b - c) - d
    function(){const a=snz(2,5),b=snz(2,6),c=snz(2,6),d=snz(2,8);const ans=-a*(b-c)-d;return typed("Evaluate −"+parn(a)+"("+parn(b)+" − "+parn(c)+") − "+parn(d)+".",ans,"Inside: "+parn(b)+"−"+parn(c)+" = "+(b-c)+". −"+parn(a)+"×"+(b-c)+" = "+(-a*(b-c))+". Then − "+parn(d)+" = "+ans+".");}
  ]
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
