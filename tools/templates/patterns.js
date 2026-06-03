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

// ---------- pattern helpers ----------
function arithSeq(start,d,n){const a=[];for(let i=0;i<n;i++)a.push(start+i*d);return a;}
function geoSeq(start,r,n){const a=[];let v=start;for(let i=0;i<n;i++){a.push(v);v*=r;}return a;}
function ordinal(k){return k+(k%10===1&&k%100!==11?"st":k%10===2&&k%100!==12?"nd":k%10===3&&k%100!==13?"rd":"th");}

const TIERS = [

// =================== MEDIUM (grade 6) ===================
[
  // 1. arithmetic next term
  function(){const start=rand(1,12),d=rand(2,9);const s=arithSeq(start,d,4);const next=start+4*d;
    return typed("What is the next term in the pattern: "+s.join(", ")+", ___ ?",next,
      "Each term increases by "+d+". So the next term is "+s[3]+" + "+d+" = "+next+".");},
  // 2. geometric next term
  function(){const start=pick([1,2,3]),r=pick([2,3]);const s=geoSeq(start,r,4);const next=s[3]*r;
    return typed("What is the next term in the pattern: "+s.join(", ")+", ___ ?",next,
      "Each term is multiplied by "+r+". So the next term is "+s[3]+" × "+r+" = "+next+".");},
  // 3. missing middle term (arithmetic)
  function(){const start=rand(2,10),d=rand(2,8);const s=arithSeq(start,d,5);const miss=s[2];
    return typed("Find the missing term: "+s[0]+", "+s[1]+", ___, "+s[3]+", "+s[4]+".",miss,
      "The pattern adds "+d+" each step, so the missing term is "+s[1]+" + "+d+" = "+miss+".");},
  // 4. function rule y = mx + b, evaluate
  function(){const m=rand(2,6),b=rand(1,9),x=rand(2,9);const y=m*x+b;
    return typed("If y = "+m+"x + "+b+", what is y when x = "+x+"?",y,
      "Substitute x = "+x+": y = "+m+"("+x+") + "+b+" = "+(m*x)+" + "+b+" = "+y+".");},
  // 5. find the rule from a table (MC, y=mx)
  function(){const m=rand(2,9);const xs=[1,2,3,4];const ys=xs.map(x=>m*x);
    const correct="y = "+m+"x";const opts=[correct,"y = x + "+m,"y = "+(m+1)+"x","y = "+m+" + x"];
    return mcText("A machine gives: input 1→"+ys[0]+", 2→"+ys[1]+", 3→"+ys[2]+", 4→"+ys[3]+". What is the rule?",
      opts,correct,"Each output is "+m+" times the input, so y = "+m+"x.");},
  // 6. reverse machine: find input from output (y=mx)
  function(){const m=rand(2,8);const x=rand(2,9);const y=m*x;
    return typed("A machine multiplies its input by "+m+". If the output is "+y+", what was the input?",x,
      "Input × "+m+" = "+y+", so input = "+y+" ÷ "+m+" = "+x+".");},
  // 7. count-on pattern with position (nth even/odd/multiple)
  function(){const k=rand(2,6);const n=rand(4,9);const ans=k*n;
    return typed("The pattern is "+k+", "+(2*k)+", "+(3*k)+", "+(4*k)+", ... What is the "+ordinal(n)+" term?",ans,
      "The pattern lists multiples of "+k+". The "+ordinal(n)+" term is "+k+" × "+n+" = "+ans+".");},
  // 8. shrinking arithmetic (subtract) next term
  function(){const start=rand(40,80),d=rand(3,9);const s=arithSeq(start,-d,4);const next=s[3]-d;
    return typed("What is the next term: "+s.join(", ")+", ___ ?",next,
      "Each term decreases by "+d+". So the next term is "+s[3]+" − "+d+" = "+next+".");},
  // 9. common difference
  function(){const start=rand(2,10),d=rand(2,9);const s=arithSeq(start,d,5);
    return typed("In the pattern "+s.join(", ")+", what number is added to get from one term to the next?",d,
      "Subtract any term from the next: "+s[1]+" − "+s[0]+" = "+d+".");},
  // 10. simple repeating-shape position (mod) -> describe value
  function(){const seq=["red","blue","green"];const start=rand(1,3)-1;const n=rand(7,18);
    const arr=[];for(let i=0;i<n;i++)arr.push(seq[(start+i)%3]);const ans=arr[n-1];
    const shown=arr.slice(0,6).join(", ");
    return mcText("Beads repeat in the pattern "+shown+", ... What color is the "+ordinal(n)+" bead?",
      ["red","blue","green"],ans,
      "The colors repeat every 3 beads. Working out position "+n+" in the cycle gives "+ans+".");},
  // 11. add-then-pattern (figurate: square numbers)
  function(){const n=rand(3,8);const ans=n*n;
    return typed("The square numbers are 1, 4, 9, 16, ... (the "+"k"+"th term is k × k). What is the "+ordinal(n)+" square number?",ans,
      "The "+ordinal(n)+" square number is "+n+" × "+n+" = "+ans+".");},
  // 12. doubling pattern term value
  function(){const start=pick([1,2,5]);const s=geoSeq(start,2,5);const idx=rand(3,5);const ans=s[idx-1];
    return typed("A pattern starts at "+start+" and doubles each step: "+s.slice(0,3).join(", ")+", ... What is the "+ordinal(idx)+" term?",ans,
      "Doubling from "+start+": term "+idx+" is "+start+" × 2"+(SUP[idx-1]||("^"+(idx-1)))+" = "+ans+".");},
],

// =================== HARD (placement bar) ===================
[
  // 1. nth term of arithmetic (formula)
  function(){const start=rand(2,9),d=rand(2,7);const n=rand(8,20);const ans=start+(n-1)*d;
    return typed("An arithmetic sequence starts at "+start+" and increases by "+d+" each term. What is the "+ordinal(n)+" term?",ans,
      "nth term = first + (n − 1) × d = "+start+" + ("+(n-1)+") × "+d+" = "+start+" + "+((n-1)*d)+" = "+ans+".");},
  // 2. find the rule from a table y=mx+b (MC)
  function(){const m=rand(2,5),b=rand(1,6);const xs=[1,2,3,4];const ys=xs.map(x=>m*x+b);
    const correct="y = "+m+"x + "+b;
    const opts=[correct,"y = "+m+"x + "+(b+1),"y = "+(m+1)+"x + "+b,"y = x + "+(m+b)];
    return mcText("Input/output table: 1→"+ys[0]+", 2→"+ys[1]+", 3→"+ys[2]+", 4→"+ys[3]+". Which rule fits?",
      opts,correct,"The outputs go up by "+m+" each step (so m = "+m+"), and when x = 0 the value would be "+b+". Rule: y = "+m+"x + "+b+".");},
  // 3. reverse machine y=mx+b find input
  function(){const m=rand(2,5),b=rand(1,9);const x=rand(2,9);const y=m*x+b;
    return typed("A machine computes output = "+m+" × input + "+b+". If the output is "+y+", what was the input?",x,
      m+" × input + "+b+" = "+y+". So "+m+" × input = "+(y-b)+", input = "+(y-b)+" ÷ "+m+" = "+x+".");},
  // 4. common difference from two non-adjacent terms
  function(){const start=rand(2,9),d=rand(2,8);const i=rand(1,3),j=i+rand(2,4);
    const ti=start+(i-1)*d,tj=start+(j-1)*d;const ans=d;
    return typed("In an arithmetic sequence, the "+ordinal(i)+" term is "+ti+" and the "+ordinal(j)+" term is "+tj+". What is the common difference?",ans,
      "From term "+i+" to term "+j+" is "+(j-i)+" steps. The total change is "+tj+" − "+ti+" = "+(tj-ti)+". So d = "+(tj-ti)+" ÷ "+(j-i)+" = "+ans+".");},
  // 5. triangular numbers
  function(){const n=rand(4,12);const ans=n*(n+1)/2;
    return typed("The triangular numbers are 1, 3, 6, 10, 15, ... (the kth is 1 + 2 + ... + k). What is the "+ordinal(n)+" triangular number?",ans,
      "The "+ordinal(n)+" triangular number is "+n+"("+n+" + 1) ÷ 2 = "+n+" × "+(n+1)+" ÷ 2 = "+ans+".");},
  // 6. sum of consecutive integers
  function(){const a=rand(1,8),count=rand(4,7);const arr=arithSeq(a,1,count);const sum=arr.reduce((p,c)=>p+c,0);
    return typed("What is the sum of these consecutive integers: "+arr.join(" + ")+" ?",sum,
      "Add the "+count+" consecutive integers: "+arr.join(" + ")+" = "+sum+".");},
  // 7. geometric nth term
  function(){const start=pick([1,2,3]),r=pick([2,3]);const n=rand(4,6);const ans=start*Math.pow(r,n-1);
    return typed("A geometric sequence starts at "+start+" and multiplies by "+r+" each term. What is the "+ordinal(n)+" term?",ans,
      "nth term = start × r"+"^(n−1) = "+start+" × "+r+SUP[n-1]+" = "+start+" × "+Math.pow(r,n-1)+" = "+ans+".");},
  // 8. Fibonacci-style next term
  function(){const a=rand(1,6),b=rand(a+1,9);const c=a+b,d=b+c,e=c+d;const ans=d+e;
    return typed("Each term is the sum of the two before it: "+a+", "+b+", "+c+", "+d+", "+e+", ___ . What is the next term?",ans,
      "Add the last two: "+d+" + "+e+" = "+ans+".");},
  // 9. differences of differences (quadratic 2nd difference)
  function(){const a=rand(1,5),d2=rand(2,4);// 2nd diff constant, 1st diff start
    const d1=rand(2,5);const s=[a];let cur=a,step=d1;for(let i=0;i<4;i++){cur+=step;s.push(cur);step+=d2;}
    const next=s[4]+ (d1+4*d2);
    return typed("Look at the pattern "+s.join(", ")+". The differences grow steadily. What is the next term?",next,
      "First differences are "+s.slice(1).map((v,i)=>v-s[i]).join(", ")+" (they increase by "+d2+"). The next difference is "+(d1+4*d2)+", so the next term is "+s[4]+" + "+(d1+4*d2)+" = "+next+".");},
  // 10. find missing input given output and a partial table
  function(){const m=rand(2,5),b=rand(0,6);const xKnown=rand(2,5);const yKnown=m*xKnown+b;
    const xTarget=xKnown+rand(2,5);const yTarget=m*xTarget+b;
    return typed("A rule turns "+xKnown+" into "+yKnown+" and turns some input into "+yTarget+" using the same y = "+m+"x + "+b+". What is that input?",xTarget,
      m+"x + "+b+" = "+yTarget+", so "+m+"x = "+(yTarget-b)+", x = "+(yTarget-b)+" ÷ "+m+" = "+xTarget+".");},
  // 11. sum of consecutive even numbers
  function(){const startK=rand(1,6);const count=rand(3,5);const arr=[];for(let i=0;i<count;i++)arr.push(2*(startK+i));
    const sum=arr.reduce((p,c)=>p+c,0);
    return typed("Add these consecutive even numbers: "+arr.join(" + ")+" = ?",sum,
      "Sum of the "+count+" even numbers: "+arr.join(" + ")+" = "+sum+".");},
  // 12. position of a value in arithmetic sequence
  function(){const start=rand(2,7),d=rand(2,6);const n=rand(5,15);const val=start+(n-1)*d;
    return typed("In the sequence "+arithSeq(start,d,4).join(", ")+", ... the term "+val+" appears. What is its position (term number)?",n,
      "Term = start + (position − 1) × d. So "+val+" = "+start+" + (p − 1) × "+d+", (p − 1) × "+d+" = "+(val-start)+", p − 1 = "+((val-start)/d)+", p = "+n+".");},
],

// =================== CHALLENGING (beyond test) ===================
[
  // 1. nth term where you must find rule first
  function(){const m=rand(2,6),b=rand(1,9);const xs=[1,2,3];const ys=xs.map(x=>m*x+b);const n=rand(10,30);const ans=m*n+b;
    return typed("A pattern's first three terms are "+ys.join(", ")+" (term k = "+m+"k + "+b+"). What is the "+ordinal(n)+" term?",ans,
      "Term k = "+m+"k + "+b+". For k = "+n+": "+m+"("+n+") + "+b+" = "+(m*n)+" + "+b+" = "+ans+".");},
  // 2. sum of first n odd numbers = n^2
  function(){const n=rand(4,12);const ans=n*n;
    return typed("What is the sum of the first "+n+" odd numbers (1 + 3 + 5 + ...)?",ans,
      "The sum of the first n odd numbers equals n². So the answer is "+n+"² = "+ans+".");},
  // 3. sum of arithmetic series via formula
  function(){const start=rand(2,8),d=rand(2,6),n=rand(5,10);const last=start+(n-1)*d;const sum=n*(start+last)/2;
    return typed("Add the first "+n+" terms of the sequence that starts at "+start+" and increases by "+d+": what is the total?",sum,
      "Last term = "+start+" + ("+(n-1)+")×"+d+" = "+last+". Sum = n × (first + last) ÷ 2 = "+n+" × ("+start+" + "+last+") ÷ 2 = "+n+" × "+(start+last)+" ÷ 2 = "+sum+".");},
  // 4. pentagonal/hexagonal-style figurate (general k-gonal small) — use centered or just square+something
  function(){const n=rand(3,8);// hexagonal numbers: n(2n-1)
    const ans=n*(2*n-1);
    return typed("The hexagonal numbers are 1, 6, 15, 28, ... (the kth is k(2k − 1)). What is the "+ordinal(n)+" hexagonal number?",ans,
      "The "+ordinal(n)+" hexagonal number is "+n+"(2×"+n+" − 1) = "+n+" × "+(2*n-1)+" = "+ans+".");},
  // 5. find nth term of a geometric sequence (larger)
  function(){const start=pick([1,2,5]),r=pick([2,3]);const n=rand(5,7);const ans=start*Math.pow(r,n-1);
    return typed("A geometric sequence is "+geoSeq(start,r,3).join(", ")+", ... What is the "+ordinal(n)+" term?",ans,
      "Term n = "+start+" × "+r+SUP[n-1]+" = "+start+" × "+Math.pow(r,n-1)+" = "+ans+".");},
  // 6. second differences constant -> find next (quadratic A*k^2 + c)
  function(){const A=rand(1,4);const c=rand(0,6);const s=[];for(let k=1;k<=4;k++)s.push(A*k*k+c);const next=A*25+c;
    return typed("The pattern is "+s.join(", ")+". The second differences are constant. What is the next term?",next,
      "These follow "+A+"k² + "+c+": "+s.map((v,i)=>A+"×"+((i+1)*(i+1))+(c?" + "+c:"")).join(", ")+". The next is "+A+"×25"+(c?" + "+c:"")+" = "+next+".");},
  // 7. reverse two-step machine with division
  function(){const m=rand(2,5),b=rand(1,9);const x=m*rand(3,8);const step=x/m; // ensure x divisible? rule: output=(input)/m + b
    const y=x/m+b;
    return typed("A machine divides the input by "+m+" and then adds "+b+". The output is "+y+". What was the input?",x,
      "input ÷ "+m+" + "+b+" = "+y+", so input ÷ "+m+" = "+(y-b)+", input = "+(y-b)+" × "+m+" = "+x+".");},
  // 8. sum of first n integers (Gauss)
  function(){const n=pick([10,15,20,25,30,40,50,100]);const ans=n*(n+1)/2;
    return typed("What is the sum 1 + 2 + 3 + ... + "+n+" ?",ans,
      "Sum = n(n + 1) ÷ 2 = "+n+" × "+(n+1)+" ÷ 2 = "+ans+".");},
  // 9. common difference & first term from two terms (find first term)
  function(){const d=rand(2,6);const i=rand(2,4),j=i+rand(2,4);const start=rand(2,9);
    const ti=start+(i-1)*d,tj=start+(j-1)*d;
    return typed("In an arithmetic sequence the "+ordinal(i)+" term is "+ti+" and the "+ordinal(j)+" term is "+tj+". What is the first term?",start,
      "Common difference d = ("+tj+" − "+ti+") ÷ ("+j+" − "+i+") = "+(tj-ti)+" ÷ "+(j-i)+" = "+d+". First term = "+ti+" − ("+i+" − 1)×"+d+" = "+ti+" − "+((i-1)*d)+" = "+start+".");},
  // 10. alternating add/multiply or alternating sign sum
  function(){const n=rand(3,11);// sum of first n terms of 1 -2 +3 -4 ... ; terms (-1)^(k+1) * k
    let sum=0;for(let k=1;k<=n;k++)sum+= (k%2===1?k:-k);
    return typed("Evaluate the alternating sum 1 − 2 + 3 − 4 + ... continuing for "+n+" terms (the "+ordinal(n)+" term is "+(n%2===1?"+":"−")+n+"). What is the total?",sum,
      "Pairing terms: each pair (odd − next even) gives −1. With "+n+" terms the total works out to "+sum+".");},
  // 11. Fibonacci-style: find earlier missing term
  function(){const a=rand(1,5),b=rand(a+1,8);const c=a+b,d=b+c,e=c+d;// give a, _, c, d, e ; missing b
    return typed("Each term is the sum of the two before it. The sequence is "+a+", ___, "+c+", "+d+", "+e+". What is the missing 2nd term?",b,
      "Since term3 = term1 + term2, we have "+c+" = "+a+" + term2, so term2 = "+c+" − "+a+" = "+b+".");},
  // 12. quadratic nth term given (n^2 + c) style evaluate
  function(){const c=rand(1,6);const n=rand(5,12);const ans=n*n+c;
    return typed("A pattern's kth term is k² + "+c+" (so the terms are "+(1+c)+", "+(4+c)+", "+(9+c)+", ...). What is the "+ordinal(n)+" term?",ans,
      "Term k = k² + "+c+". For k = "+n+": "+n+"² + "+c+" = "+(n*n)+" + "+c+" = "+ans+".");},
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
