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
    // 1. two-op: a + b × c
    function(){const a=rand(2,12),b=rand(2,9),c=rand(2,9);const ans=a+b*c;return typed("Evaluate: "+a+" + "+b+" × "+c+".",ans,"Multiply first: "+b+" × "+c+" = "+(b*c)+"; then "+a+" + "+(b*c)+" = "+ans+".");},
    // 2. two-op: a - b ÷ c (clean)
    function(){const b1=rand(2,6);const q=rand(2,9);const b=b1*q;const c=b1;const a=rand(b/c+1,20);const ans=a-b/c;return typed("Evaluate: "+a+" − "+b+" ÷ "+c+".",ans,"Divide first: "+b+" ÷ "+c+" = "+(b/c)+"; then "+a+" − "+(b/c)+" = "+ans+".");},
    // 3. parentheses first
    function(){const a=rand(2,12),b=rand(2,9),c=rand(2,6);const ans=(a+b)*c;return typed("Evaluate: ("+a+" + "+b+") × "+c+".",ans,"Parentheses first: "+a+" + "+b+" = "+(a+b)+"; then × "+c+" = "+ans+".");},
    // 4. exponent then add
    function(){const base=rand(2,7),e=pick([2,3]);const add=rand(2,15);const ans=Math.pow(base,e)+add;return typed("Evaluate: "+base+SUP[e]+" + "+add+".",ans,base+SUP[e]+" = "+Math.pow(base,e)+"; + "+add+" = "+ans+".");},
    // 5. mult and div left to right
    function(){const q=rand(2,6);const c=rand(2,5);const a=q*c;const b=rand(2,8);const ans=a/c*b;return typed("Evaluate: "+a+" ÷ "+c+" × "+b+".",ans,"Left to right: "+a+" ÷ "+c+" = "+(a/c)+"; × "+b+" = "+ans+".");},
    // 6. evaluate one-variable expression
    function(){const a=rand(2,8),b=rand(2,12),x=rand(2,9);const ans=a*x+b;return typed("Evaluate "+a+"x + "+b+" when x = "+x+".",ans,a+"("+x+") = "+(a*x)+"; + "+b+" = "+ans+".");},
    // 7. combine like terms (numeric coefficient answer)
    function(){const a=rand(2,9),b=rand(2,9);const ans=a+b;return typed("Combine like terms: "+a+"x + "+b+"x. Enter the coefficient of x in the result.",ans,a+"x + "+b+"x = "+ans+"x, so the coefficient is "+ans+".");},
    // 8. three terms add/sub left to right
    function(){const a=rand(10,30),b=rand(2,9),c=rand(2,9);const ans=a-b+c;return typed("Evaluate: "+a+" − "+b+" + "+c+".",ans,"Left to right: "+a+" − "+b+" = "+(a-b)+"; + "+c+" = "+ans+".");},
    // 9. parentheses with subtraction inside
    function(){const a=rand(8,20),b=rand(2,7),c=rand(2,5);const ans=c*(a-b);return typed("Evaluate: "+c+"("+a+" − "+b+").",ans,"Inside: "+a+" − "+b+" = "+(a-b)+"; × "+c+" = "+ans+".");},
    // 10. division of a sum (clean)
    function(){const c=rand(2,6);const q=rand(2,8);const total=c*q;const a=rand(1,total-1);const b=total-a;const ans=total/c;return typed("Evaluate: ("+a+" + "+b+") ÷ "+c+".",ans,"Inside: "+a+" + "+b+" = "+total+"; ÷ "+c+" = "+ans+".");},
    // 11. square of a sum-style (exponent on parentheses)
    function(){const a=rand(1,6),b=rand(1,6);const s=a+b;const ans=s*s;return typed("Evaluate: ("+a+" + "+b+")"+SUP[2]+".",ans,"Inside: "+a+" + "+b+" = "+s+"; "+s+SUP[2]+" = "+ans+".");},
    // 12. two-op multiply then subtract
    function(){const a=rand(2,9),b=rand(2,9),c=rand(2,15);const ans=a*b-c;if(ans<0)return arguments.callee();return typed("Evaluate: "+a+" × "+b+" − "+c+".",ans,"Multiply first: "+a+" × "+b+" = "+(a*b)+"; − "+c+" = "+ans+".");}
  ],
  [ /* HARD */
    // 1. a + b × c - d
    function(){const a=rand(2,15),b=rand(2,8),c=rand(2,8),d=rand(2,12);const ans=a+b*c-d;return typed("Evaluate: "+a+" + "+b+" × "+c+" − "+d+".",ans,"Multiply: "+b+"×"+c+" = "+(b*c)+". Then "+a+" + "+(b*c)+" − "+d+" = "+ans+".");},
    // 2. exponent inside an expression
    function(){const base=rand(2,5),e=pick([2,3]);const m=rand(2,5);const add=rand(2,12);const ans=m*Math.pow(base,e)+add;return typed("Evaluate: "+m+" × "+base+SUP[e]+" + "+add+".",ans,base+SUP[e]+" = "+Math.pow(base,e)+"; × "+m+" = "+(m*Math.pow(base,e))+"; + "+add+" = "+ans+".");},
    // 3. parentheses then exponent then op
    function(){const a=rand(2,7),b=rand(1,5);const s=a-b;if(s<=1)return arguments.callee();const add=rand(2,12);const ans=s*s+add;return typed("Evaluate: ("+a+" − "+b+")"+SUP[2]+" + "+add+".",ans,"Inside: "+a+" − "+b+" = "+s+"; "+s+SUP[2]+" = "+(s*s)+"; + "+add+" = "+ans+".");},
    // 4. nested brackets
    function(){const a=rand(2,5),b=rand(2,6),c=rand(2,6),d=rand(20,40);const inner=b+c;const ans=d-a*inner;if(ans<0)return arguments.callee();return typed("Evaluate: "+d+" − "+a+"["+b+" + "+c+"].",ans,"Brackets: "+b+" + "+c+" = "+inner+"; "+a+" × "+inner+" = "+(a*inner)+"; "+d+" − "+(a*inner)+" = "+ans+".");},
    // 5. distribute then combine: a(x + b) at value
    function(){const a=rand(2,5),b=rand(2,8),x=rand(2,7);const ans=a*x+a*b;return typed("Expand and evaluate "+a+"(x + "+b+") when x = "+x+".",ans,a+"("+x+" + "+b+") = "+a+"("+(x+b)+") = "+ans+".");},
    // 6. two-variable expression
    function(){const a=rand(2,5),b=rand(2,5),x=rand(2,7),y=rand(2,7);const ans=a*x+b*y;return typed("Evaluate "+a+"x + "+b+"y when x = "+x+" and y = "+y+".",ans,a+"("+x+") = "+(a*x)+"; "+b+"("+y+") = "+(b*y)+"; sum = "+ans+".");},
    // 7. combine like terms with subtraction, give coefficient
    function(){const a=rand(5,12),b=rand(2,a-1),c=rand(2,8);const ans=a-b+c;return typed("Combine like terms: "+a+"x − "+b+"x + "+c+"x. Enter the coefficient of x.",ans,a+" − "+b+" + "+c+" = "+ans+", so "+ans+"x.");},
    // 8. distribute two and combine constant: a(x+b) at x, plus c
    function(){const a=rand(2,4),b=rand(2,6),x=rand(2,6),c=rand(2,10);const ans=a*(x+b)+c;return typed("Evaluate "+a+"(x + "+b+") + "+c+" when x = "+x+".",ans,a+"("+x+"+"+b+") = "+(a*(x+b))+"; + "+c+" = "+ans+".");},
    // 9. order with division and multiplication both
    function(){const c=rand(2,5);const q=rand(2,6);const a=c*q;const b=rand(2,6);const d=rand(2,12);const ans=a/c*b+d;return typed("Evaluate: "+a+" ÷ "+c+" × "+b+" + "+d+".",ans,"Left to right (÷,×): "+a+" ÷ "+c+" = "+(a/c)+"; × "+b+" = "+(a/c*b)+"; + "+d+" = "+ans+".");},
    // 10. fraction bar (numerator expr) / denominator clean
    function(){const c=rand(2,6);const q=rand(2,6);const total=c*q;const a=rand(2,9),b=total-a;if(b<2)return arguments.callee();const ans=total/c;return typed("Evaluate: ("+a+" × 1 + "+b+") ÷ "+c+".",ans,"Numerator: "+a+" + "+b+" = "+total+"; ÷ "+c+" = "+ans+".");},
    // 11. with negatives: a - b × c
    function(){const a=snz(2,12),b=snz(2,6),c=snz(2,6);const ans=a-b*c;return typed("Evaluate: "+parn(a)+" − "+parn(b)+" × "+parn(c)+".",ans,"Multiply first: "+parn(b)+" × "+parn(c)+" = "+(b*c)+"; then "+parn(a)+" − "+parn(b*c)+" = "+ans+".");},
    // 12. exponent of negative inside ordered expression
    function(){const base=snz(2,4);const e=2;const add=snz(2,12);const ans=Math.pow(base,e)+add;return typed("Evaluate: ("+base+")"+SUP[e]+" + "+parn(add)+".",ans,"("+base+")"+SUP[e]+" = "+Math.pow(base,e)+"; "+withSign(add)+" = "+ans+".");}
  ],
  [ /* CHALLENGING */
    // 1. full PEMDAS: a + b × c² - d
    function(){const a=rand(2,12),b=rand(2,5),c=rand(2,5),d=rand(2,15);const ans=a+b*c*c-d;if(ans<0)return arguments.callee();return typed("Evaluate: "+a+" + "+b+" × "+c+SUP[2]+" − "+d+".",ans,c+SUP[2]+" = "+(c*c)+"; "+b+" × "+(c*c)+" = "+(b*c*c)+"; "+a+" + "+(b*c*c)+" − "+d+" = "+ans+".");},
    // 2. nested brackets two levels
    function(){const a=rand(2,4),b=rand(2,4),c=rand(2,5),d=rand(2,5);const inner=c+d;const mid=b*inner;const e=rand(2,8);const ans=a*(mid-e);if(mid-e<=0)return arguments.callee();return typed("Evaluate: "+a+"("+b+"["+c+" + "+d+"] − "+e+").",ans,"["+c+"+"+d+"] = "+inner+"; "+b+"×"+inner+" = "+mid+"; "+mid+" − "+e+" = "+(mid-e)+"; "+a+"×"+(mid-e)+" = "+ans+".");},
    // 3. distribute two binomials-of-constants combine: a(b+c) - d(e-f)
    function(){const a=rand(2,5),b=rand(2,6),c=rand(2,6),d=rand(2,4),e=rand(4,8),f=rand(1,3);const ans=a*(b+c)-d*(e-f);return typed("Evaluate: "+a+"("+b+" + "+c+") − "+d+"("+e+" − "+f+").",ans,a+"("+(b+c)+") = "+(a*(b+c))+"; "+d+"("+(e-f)+") = "+(d*(e-f))+"; difference = "+ans+".");},
    // 4. evaluate ax² + bx + c (positive x) full order
    function(){const a=rand(1,3),b=rand(2,5),c=rand(2,9),x=rand(2,5);const ans=a*x*x+b*x+c;return typed("Evaluate "+(a===1?"":a)+"x"+SUP[2]+" + "+b+"x + "+c+" when x = "+x+".",ans,a+"("+x+")"+SUP[2]+" = "+(a*x*x)+"; "+b+"("+x+") = "+(b*x)+"; + "+c+" = "+ans+".");},
    // 5. two-variable with exponent: x² + y²
    function(){const x=rand(2,7),y=rand(2,7);const ans=x*x+y*y;return typed("Evaluate x"+SUP[2]+" + y"+SUP[2]+" when x = "+x+" and y = "+y+".",ans,x+SUP[2]+" = "+(x*x)+"; "+y+SUP[2]+" = "+(y*y)+"; sum = "+ans+".");},
    // 6. division of an expression by an expression (clean)
    function(){const c=rand(2,5);const q=rand(2,6);const num=c*q;const a=rand(2,8),b=num-a;if(b<2)return arguments.callee();const d=rand(2,9);const ans=num/c+d;return typed("Evaluate: ("+a+" + "+b+") ÷ "+c+" + "+d+".",ans,"Numerator "+a+"+"+b+" = "+num+"; ÷ "+c+" = "+(num/c)+"; + "+d+" = "+ans+".");},
    // 7. distribute then combine like terms, report coefficient
    function(){const a=rand(2,5),b=rand(2,5),c=rand(2,6);const ans=a+b*c;return typed("Simplify "+a+"x + "+b+"("+c+"x) and enter the coefficient of x.",ans,b+"("+c+"x) = "+(b*c)+"x; "+a+"x + "+(b*c)+"x = "+ans+"x.");},
    // 8. PEMDAS with division, exponent, subtraction
    function(){const base=rand(2,4),e=2;const sq=base*base;const div=rand(1,4)*sq;const a=rand(20,40);const ans=a-div/sq;return typed("Evaluate: "+a+" − "+div+" ÷ "+base+SUP[e]+".",ans,base+SUP[e]+" = "+sq+"; "+div+" ÷ "+sq+" = "+(div/sq)+"; "+a+" − "+(div/sq)+" = "+ans+".");},
    // 9. with negatives full: a - b(c - d) + e²
    function(){const a=snz(2,10),b=snz(2,4),c=snz(2,5),d=snz(2,5),e=rand(2,4);const ans=a-b*(c-d)+e*e;return typed("Evaluate: "+parn(a)+" − "+parn(b)+"("+parn(c)+" − "+parn(d)+") + "+e+SUP[2]+".",ans,"Inside: "+parn(c)+"−"+parn(d)+" = "+(c-d)+"; "+parn(b)+"×"+(c-d)+" = "+(b*(c-d))+"; "+e+SUP[2]+" = "+(e*e)+". Total: "+ans+".");},
    // 10. combine like terms with two variables, report x-coefficient
    function(){const a=rand(3,9),b=rand(2,a-1),c=rand(2,6);const ans=a-b;return typed("Combine like terms: "+a+"x + "+c+"y − "+b+"x. Enter the coefficient of x.",ans,"x-terms: "+a+"x − "+b+"x = "+ans+"x. (The "+c+"y is unlike.)");},
    // 11. order with a power of a product
    function(){const a=rand(2,4),b=rand(2,4);const p=a*b;const ans=p*p;return typed("Evaluate: ("+a+" × "+b+")"+SUP[2]+".",ans,"Inside: "+a+" × "+b+" = "+p+"; "+p+SUP[2]+" = "+ans+".");},
    // 12. multi-step word: order of ops from a sentence
    function(){const boxes=rand(3,8);const per=rand(4,9);const extra=rand(2,12);const ans=boxes*per+extra;return typed("There are "+boxes+" boxes with "+per+" items each, plus "+extra+" loose items. How many items in all?",ans,boxes+" × "+per+" = "+(boxes*per)+"; + "+extra+" = "+ans+".");}
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
