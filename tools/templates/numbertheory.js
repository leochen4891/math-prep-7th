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

// ---------- number-theory helpers ----------
function lcm(a,b){return Math.abs(a*b)/gcd(a,b);}
function isPrime(n){if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true;}
function primesUpTo(n){const r=[];for(let i=2;i<=n;i++)if(isPrime(i))r.push(i);return r;}
function factorize(n){const f={};let m=n;for(let p=2;p*p<=m;p++){while(m%p===0){f[p]=(f[p]||0)+1;m/=p;}}if(m>1)f[m]=(f[m]||0)+1;return f;}
function pfString(n){const f=factorize(n);const keys=Object.keys(f).map(Number).sort((a,b)=>a-b);
  return keys.map(p=>f[p]>1?(p+(SUP[f[p]]||"^"+f[p])):(""+p)).join(" × ");}
function numFactors(n){const f=factorize(n);let c=1;Object.keys(f).forEach(p=>c*=(f[p]+1));return c;}
function compositeNonPrime(min,max){let n;do{n=rand(min,max);}while(isPrime(n)||n<4);return n;}

const TIERS = [

// =================== MEDIUM (grade 6) ===================
[
  // 1. GCF of two
  function(){const a=pick([12,16,18,24,20,30,36])*1;const b=pick([8,12,16,18,24,30,15])*1;const g=gcd(a,b);
    return mcNum("What is the greatest common factor (GCF) of "+a+" and "+b+"?",g,[lcm(a,b)%100,g*2],
      "List shared factors of "+a+" and "+b+". The largest is "+g+".");},
  // 2. LCM of two
  function(){const a=pick([4,6,8,3,5])*1;const b=pick([6,9,10,12,8])*1;const l=lcm(a,b);
    return mcNum("What is the least common multiple (LCM) of "+a+" and "+b+"?",l,[a*b,gcd(a,b)],
      "The smallest number both "+a+" and "+b+" divide into is "+l+".");},
  // 3. prime vs composite
  function(){const useP=pick([true,false]);let n;if(useP){n=pick([2,3,5,7,11,13,17,19,23,29,31]);}else{n=pick([4,6,8,9,10,12,14,15,21,22,25,27]);}
    const ans=isPrime(n)?"Prime":"Composite";
    return mcText("Is "+n+" prime or composite?",["Prime","Composite"],ans,
      isPrime(n)?(n+" has exactly two factors (1 and "+n+"), so it is prime."):(n+" has a factor other than 1 and itself, so it is composite."));},
  // 4. how many factors (small)
  function(){const n=pick([6,8,10,12,14,15,16,18,20,9,25]);const c=numFactors(n);
    return mcNum("How many factors does "+n+" have?",c,[c+1,c-1>0?c-1:c+2],
      "Factors of "+n+" come in pairs that multiply to "+n+". Counting them gives "+c+".");},
  // 5. divisibility yes/no
  function(){const k=pick([2,3,5,9,10,4,6]);const yes=pick([true,false]);let n;
    if(yes){n=k*rand(3,12);}else{do{n=rand(20,99);}while(n%k===0);}
    const ans=(n%k===0)?"Yes":"No";
    return mcText("Is "+n+" divisible by "+k+"?",["Yes","No"],ans,
      (n%k===0)?(n+" ÷ "+k+" = "+(n/k)+" with no remainder, so yes."):(n+" ÷ "+k+" leaves a remainder of "+(n%k)+", so no."));},
  // 6. which is divisible by k
  function(){const k=pick([3,4,5,6,9]);const good=k*rand(4,16);const opts=new Set([good]);
    while(opts.size<4){const c=rand(20,99);if(c%k!==0)opts.add(c);}
    return mcText("Which of these numbers is divisible by "+k+"?  ("+shuffle(Array.from(opts)).join(", ")+")",Array.from(opts).map(String),String(good),
      good+" ÷ "+k+" = "+(good/k)+", so "+good+" is divisible by "+k+".");},
  // 7. list factors count for prime-square or 2·prime (small)
  function(){const r=pick([2,3,5,7,11]);const form=pick(["sq","prime"]);
    if(form==="sq"){const n=r*r;return mcNum("How many factors does the number "+n+" have?",3,[2,4],
      n+" = "+r+" × "+r+", so its factors are 1, "+r+", and "+n+" — that is 3 factors.");}
    const p=pick([2,3,5,7].filter(x=>x!==r));const n=r*p;
    return mcNum("How many factors does the number "+n+" have?",4,[2,3],
      n+" = "+Math.min(r,p)+" × "+Math.max(r,p)+" (two different primes), so it has 4 factors: 1, "+Math.min(r,p)+", "+Math.max(r,p)+", "+n+".");},
  // 8. smallest multiple greater than X
  function(){const k=pick([4,6,7,8,9]);const x=rand(20,50);const m=(Math.floor(x/k)+1)*k;
    return mcNum("What is the smallest multiple of "+k+" that is greater than "+x+"?",m,[m+k,m-k],
      "Multiples of "+k+" near "+x+": the first one above "+x+" is "+m+".");},
  // 9. is a number a multiple
  function(){const k=pick([3,4,5,6]);const yes=pick([true,false]);let n;
    if(yes)n=k*rand(3,10);else{do{n=rand(15,60);}while(n%k===0);}
    const ans=(n%k===0)?"Yes":"No";
    return mcText("Is "+n+" a multiple of "+k+"?",["Yes","No"],ans,
      (n%k===0)?(""+k+" × "+(n/k)+" = "+n+", so yes."):(n+" is not "+k+" times a whole number, so no."));},
  // 10. common factor (is it a factor of both)
  function(){const g=pick([2,3,4,5,6]);let ma=rand(2,7),mb=rand(2,7);while(mb===ma)mb=rand(2,7);const a=g*ma,b=g*mb;
    const set=new Set([String(g)]);const cand=[a+1,b+1,a-1,b-1,a,b,g+g*7];let i=0;
    while(set.size<4&&i<cand.length){const c=cand[i++];if(c>0&&(a%c!==0||b%c!==0))set.add(String(c));}
    let bump=g*8;while(set.size<4){if(a%bump!==0||b%bump!==0)set.add(String(bump));bump++;}
    return mcText("Which number is a common factor of both "+a+" and "+b+"?",
      Array.from(set),String(g),
      g+" divides "+a+" ("+a+" ÷ "+g+" = "+(a/g)+") and "+b+" ("+b+" ÷ "+g+" = "+(b/g)+"), so it is a common factor.");},
  // 11. prime factorization MC
  function(){const pool=[12,18,20,24,28,36,45,50,40,54];const n=pick(pool);const ans=pfString(n);
    const set=new Set([ans]);const alt=shuffle(pool.filter(x=>x!==n));let i=0;
    while(set.size<3&&i<alt.length){set.add(pfString(alt[i++]));}
    // add the "× 1" decoy last if room
    if(set.size<4)set.add(ans+" × 1");
    let extra=2;while(set.size<4){set.add(pfString(n)+" × "+extra);extra++;}
    return mcText("What is the prime factorization of "+n+"?",
      Array.from(set),ans,
      n+" breaks down into primes as "+ans+". The other options multiply to a different number or are not fully factored into primes.");},
  // 12. count multiples in a range
  function(){const k=pick([3,4,5,6]);const hi=pick([20,24,30,36,40]);const c=Math.floor(hi/k);
    return mcNum("How many multiples of "+k+" are there from 1 to "+hi+"?",c,[c+1,c-1],
      "Multiples of "+k+" up to "+hi+": "+hi+" ÷ "+k+" = "+c+" of them.");},
],

// =================== HARD (placement bar) ===================
[
  // 1. LCM of three
  function(){const a=pick([2,3,4,6]),b=pick([4,5,6,8]),c=pick([3,5,9,10]);const l=lcm(lcm(a,b),c);
    return mcNum("What is the least common multiple (LCM) of "+a+", "+b+", and "+c+"?",l,[a*b*c,lcm(a,b)],
      "LCM("+a+","+b+") = "+lcm(a,b)+", then LCM("+lcm(a,b)+","+c+") = "+l+".");},
  // 2. GCF word problem (tiling)
  function(){const L=pick([12,18,24,30,36]),W=pick([8,16,20,24,30,15]);const g=gcd(L,W);
    return typed("A floor is "+L+" inches by "+W+" inches. What is the side length (in inches) of the largest square tile that fits evenly with no cutting?",g,
      "The largest square tile side is GCF("+L+", "+W+") = "+g+" inches.");},
  // 3. LCM word problem (bells / blinking)
  function(){const a=pick([6,8,9,10,12]),b=pick([8,9,12,15,10]);const l=lcm(a,b);
    return typed("One light blinks every "+a+" seconds and another every "+b+" seconds. They blink together now. After how many seconds will they next blink together?",l,
      "They align at LCM("+a+", "+b+") = "+l+" seconds.");},
  // 4. how many factors (larger)
  function(){const n=pick([24,36,48,60,72,30,40,96,100]);const c=numFactors(n);
    return typed("How many factors (divisors) does "+n+" have?",c,
      n+" = "+pfString(n)+". The number of factors is the product of (each exponent + 1), giving "+c+".");},
  // 5. GCF then LCM product check
  function(){const a=pick([12,18,24,20]),b=pick([16,30,28,15]);const g=gcd(a,b),l=lcm(a,b);
    return typed("For "+a+" and "+b+", the GCF is "+g+". What is their LCM? (Hint: GCF × LCM = the product of the two numbers.)",l,
      "GCF × LCM = "+a+" × "+b+" = "+(a*b)+". So LCM = "+(a*b)+" ÷ "+g+" = "+l+".");},
  // 6. divisibility by 6 reasoning
  function(){const yes=pick([true,false]);let n;if(yes){n=6*rand(8,16);}else{do{n=rand(30,99);}while(n%6===0);}
    const ans=(n%6===0)?"Yes":"No";
    return mcText("Is "+n+" divisible by 6?",["Yes","No"],ans,
      "A number is divisible by 6 when it is divisible by both 2 and 3. "+n+(n%6===0?" is, so yes.":" is not, so no."));},
  // 7. smallest number with remainder 1 for a divisor set
  function(){const set=pick([[2,3,4],[2,3],[3,4],[2,3,5],[2,4,5],[3,4,5],[2,3,6],[4,5,6],[2,5,6]]);
    const L=set.reduce((acc,v)=>lcm(acc,v),1);const ans=L+1;
    return typed("What is the smallest whole number greater than 1 that leaves a remainder of 1 when divided by "+set.join(", ")+"?",ans,
      "The number is one more than a common multiple of "+set.join(", ")+". LCM = "+L+", so the answer is "+L+" + 1 = "+ans+".");},
  // 8. remainder problem
  function(){const k=pick([7,9,11,13]);const q=rand(3,9),r=rand(1,k-1);const n=k*q+r;
    return typed("When "+n+" is divided by "+k+", what is the remainder?",r,
      n+" = "+k+" × "+q+" + "+r+", so the remainder is "+r+".");},
  // 8b duplicate guard removed -> 9. prime factorization with exponents (count of a prime)
  function(){const base=pick([2,3,5]);const e=rand(3,5);const extra=pick([1,3,5,7]);const n=Math.pow(base,e)*extra;
    const cnt=factorize(n)[base]||0;
    return typed("In the prime factorization of "+n+", how many times does the prime "+base+" appear?",cnt,
      n+" = "+pfString(n)+", so the prime "+base+" appears "+cnt+" time(s).");},
  // 10. which is prime (one prime among composites)
  function(){const p=pick([29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]);const opts=new Set([p]);
    while(opts.size<4){const c=rand(20,99);if(!isPrime(c))opts.add(c);}
    const list=shuffle(Array.from(opts));
    return mcText("Which of these numbers is prime:  "+list.join(", ")+"?",list.map(String),String(p),
      p+" has no factors other than 1 and itself, so it is prime. The others are composite.");},
  // 11. GCF of three
  function(){const g=pick([3,4,5,6]);const a=g*pick([2,4,5]),b=g*pick([3,5,7]),c=g*pick([2,3,7]);const ans=gcd(gcd(a,b),c);
    return typed("What is the greatest common factor (GCF) of "+a+", "+b+", and "+c+"?",ans,
      "GCF("+a+","+b+") = "+gcd(a,b)+", then GCF("+gcd(a,b)+","+c+") = "+ans+".");},
  // 12. next common multiple after a given one
  function(){const a=pick([4,6,8]),b=pick([6,9,10]);const l=lcm(a,b);const k=rand(2,4);const ans=l*(k+1);
    return typed("Two events both occur every LCM of "+a+" and "+b+" units. They have just occurred together for the "+k+(k===1?"st":k===2?"nd":k===3?"rd":"th")+" time. After how many more units do they occur together again? (They align every "+l+" units.)",l,
      "They align every "+l+" units, so the next alignment is "+l+" units later.");},
],

// =================== CHALLENGING (beyond test) ===================
[
  // 1. GCF×LCM = product, solve for missing number
  function(){const g=pick([4,6,8]),a=g*pick([3,5,7]);const l=a*pick([2,3,4]);
    // LCM*GCF = a*b => b = l*g/a, ensure integer & gcd(a,b)=g
    let b=l*g/a;if(!Number.isInteger(b)||gcd(a,b)!==g){b=g*5;return typed("Two numbers are "+a+" and "+b+". Their GCF is "+gcd(a,b)+". What is their LCM?",lcm(a,b),"GCF × LCM = "+a+" × "+b+", so LCM = "+(a*b)+" ÷ "+gcd(a,b)+" = "+lcm(a,b)+".");}
    return typed("Two numbers have a GCF of "+g+" and an LCM of "+l+". One of the numbers is "+a+". What is the other number?",b,
      "GCF × LCM = product of the numbers: "+g+" × "+l+" = "+(g*l)+". Other number = "+(g*l)+" ÷ "+a+" = "+b+".");},
  // 2. number of factors -> find a number / count
  function(){const n=pick([36,48,60,72,96,120,144,100,90]);const c=numFactors(n);
    return typed("How many positive divisors does "+n+" have?",c,
      n+" = "+pfString(n)+". Multiply (exponent + 1) for each prime: that gives "+c+" divisors.");},
  // 3. sum of factors-ish: count odd factors
  function(){const odd=pick([15,45,75,105,135,21,63]);const c=numFactors(odd);
    return typed("How many factors does "+odd+" have? (All of them are odd.)",c,
      odd+" = "+pfString(odd)+", so the number of factors is "+c+".");},
  // 4. Chinese-remainder style smallest number
  function(){// n ≡ r mod a and n ≡ r mod b with same r -> n = LCM(a,b)+r ... use small remainder common
    const a=pick([4,5,6]),b=pick([6,7,9]);const r=rand(1,Math.min(a,b)-1);const L=lcm(a,b);const ans=L+r;
    return typed("What is the smallest whole number greater than "+r+" that leaves a remainder of "+r+" when divided by both "+a+" and "+b+"?",ans,
      "Such numbers are r more than a common multiple of "+a+" and "+b+". LCM("+a+","+b+") = "+L+", so the answer is "+L+" + "+r+" = "+ans+".");},
  // 5. perfect square / count primes property
  function(){const p=pick([2,3,5,7]),q=pick([3,5,7,11]);if(p===q)return typed("How many factors does "+(p*p)+" have?",3,p+" × "+p+" gives factors 1, "+p+", "+(p*p)+" — 3 factors.");
    const n=p*q;
    return typed("The number "+n+" is the product of two different primes. How many factors does it have?",4,
      n+" = "+Math.min(p,q)+" × "+Math.max(p,q)+". A product of two distinct primes always has exactly 4 factors: 1, "+Math.min(p,q)+", "+Math.max(p,q)+", and "+n+".");},
  // 6. LCM of three word problem (gears / schedules)
  function(){const a=pick([3,4,6]),b=pick([5,8,9]),c=pick([6,10,12]);const l=lcm(lcm(a,b),c);
    return typed("Three buses leave a station together. They return every "+a+", "+b+", and "+c+" minutes. After how many minutes do all three leave together again?",l,
      "Find LCM("+a+", "+b+", "+c+"): LCM("+a+","+b+") = "+lcm(a,b)+", then LCM with "+c+" = "+l+" minutes.");},
  // 7. divisibility by lcm(p,q) reasoning, find count
  function(){const pq=pick([[3,4],[2,5],[3,5],[4,5],[2,7],[3,6],[4,6]]);const k=lcm(pq[0],pq[1]);const hi=k*rand(6,12);const c=Math.floor(hi/k);
    return typed("How many whole numbers from 1 to "+hi+" are divisible by both "+pq[0]+" and "+pq[1]+"?",c,
      "Divisible by both "+pq[0]+" and "+pq[1]+" means divisible by their LCM, "+k+". "+hi+" ÷ "+k+" = "+fmt(hi/k)+", so there are "+c+" such numbers.");},
  // 8. GCF of consecutive integers (=1) conceptual
  function(){const n=rand(10,40);
    return mcNum("What is the greatest common factor of "+n+" and "+(n+1)+"?",1,[n,n+1,2],
      "Consecutive integers share no common factor other than 1, so the GCF is 1.");},
  // 9. find number from remainder conditions (different remainders)
  function(){// n ≡ a-1 mod a and ≡ b-1 mod b  => n+1 divisible by a and b => n = LCM(a,b)-1
    const a=pick([3,4,5]),b=pick([4,5,6]);const L=lcm(a,b);const ans=L-1;
    return typed("What is the smallest positive number that leaves a remainder of "+(a-1)+" when divided by "+a+" and a remainder of "+(b-1)+" when divided by "+b+"?",ans,
      "Each remainder is one less than its divisor, so the number is one less than a common multiple. LCM("+a+","+b+") = "+L+", so the answer is "+L+" − 1 = "+ans+".");},
  // 10. largest prime factor
  function(){const n=pick([84,90,126,150,198,210,165,140]);const f=factorize(n);const lp=Math.max.apply(null,Object.keys(f).map(Number));
    return typed("What is the largest prime factor of "+n+"?",lp,
      n+" = "+pfString(n)+", so the largest prime factor is "+lp+".");},
  // 11. how many divisors are even
  function(){const base=pick([12,20,24,40,36,48,18,28,44,50,60,72]);const total=numFactors(base);
    // even divisors = total - (divisors of odd part)
    const f=factorize(base);const a2=f[2]||0;let oddPart=base;while(oddPart%2===0)oddPart/=2;const oddDiv=numFactors(oddPart);const evenDiv=total-oddDiv;
    if(a2===0)return typed("How many factors does "+base+" have?",total,base+" = "+pfString(base)+", giving "+total+" factors.");
    return typed("How many of the factors of "+base+" are even numbers?",evenDiv,
      base+" has "+total+" factors in all. The odd factors are the divisors of "+oddPart+" (there are "+oddDiv+"). So even factors = "+total+" − "+oddDiv+" = "+evenDiv+".");},
  // 12. GCF/LCM relationship solve LCM from product and GCF
  function(){const a=pick([18,24,30,40]),b=pick([27,36,45,60,16]);const g=gcd(a,b),l=lcm(a,b);
    return typed("Two numbers are "+a+" and "+b+". Their greatest common factor is "+g+". Using GCF × LCM = product, find their LCM.",l,
      "GCF × LCM = "+a+" × "+b+" = "+(a*b)+". So LCM = "+(a*b)+" ÷ "+g+" = "+l+".");},
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
