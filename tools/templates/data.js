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

// ---- local helpers for data ----
function lst(arr){return arr.join(", ");}
function sortAsc(arr){return arr.slice().sort((a,b)=>a-b);}
function sumArr(arr){return arr.reduce((s,x)=>s+x,0);}

const TIERS = [
  /* ===================== MEDIUM (grade-6) ===================== */
  [
    // 1. Mean (whole-number result)
    function(){
      const n=pick([4,5]);
      const mean=rand(5,15);
      const arr=[];
      for(let i=0;i<n;i++) arr.push(rand(1,20));
      // adjust last so sum is divisible -> easier: pick arr with controlled sum
      let s=sumArr(arr);
      const target=mean*n;
      arr[n-1]+=target-s;
      if(arr[n-1]<1||arr[n-1]>40) return TIERS[0][0]();
      return typed("Find the mean (average) of this data set:<br>"+lst(arr),
        mean, "Mean = sum ÷ count = "+sumArr(arr)+" ÷ "+n+" = "+mean+".");
    },
    // 2. Median (odd count)
    function(){
      const n=pick([5,7]);
      const arr=[];
      for(let i=0;i<n;i++) arr.push(rand(1,30));
      const s=sortAsc(arr);
      const med=s[(n-1)/2];
      return typed("Find the median of this data set:<br>"+lst(arr),
        med, "Sort: "+lst(s)+". With "+n+" values, the median is the middle one: "+med+".");
    },
    // 3. Mode
    function(){
      const base=rand(2,12);
      const m=rand(1,9);
      // ensure m appears most: include m three times, others once
      let others=[];
      while(others.length<3){ const x=rand(1,15); if(x!==m&&others.indexOf(x)===-1) others.push(x); }
      const arr=shuffle([m,m,m].concat(others));
      return typed("Find the mode of this data set:<br>"+lst(arr),
        m, "The mode is the value that appears most often. "+m+" appears 3 times, more than any other value.");
    },
    // 4. Range
    function(){
      const arr=[];
      for(let i=0;i<pick([5,6]);i++) arr.push(rand(2,40));
      const s=sortAsc(arr);
      const r=s[s.length-1]-s[0];
      if(r===0) return TIERS[0][3]();
      return typed("Find the range of this data set:<br>"+lst(arr),
        r, "Range = largest − smallest = "+s[s.length-1]+" − "+s[0]+" = "+r+".");
    },
    // 5. Max
    function(){
      const arr=[];
      for(let i=0;i<6;i++) arr.push(rand(1,50));
      const mx=Math.max(...arr);
      return typed("What is the maximum (largest) value in this data set?<br>"+lst(arr),
        mx, "Scan the list for the biggest number: "+mx+".");
    },
    // 6. Min
    function(){
      const arr=[];
      for(let i=0;i<6;i++) arr.push(rand(1,50));
      const mn=Math.min(...arr);
      return typed("What is the minimum (smallest) value in this data set?<br>"+lst(arr),
        mn, "Scan the list for the smallest number: "+mn+".");
    },
    // 7. Total from mean (mean × count)
    function(){
      const n=rand(4,9);
      const mean=rand(6,20);
      const total=mean*n;
      return typed("A class of "+n+" students has a mean test score of "+mean+". What is the total of all their scores?",
        total, "Total = mean × count = "+mean+" × "+n+" = "+total+".");
    },
    // 8. Simple probability (favorable/total) as a fraction
    function(){
      const fav=rand(1,5);
      const other=rand(2,7);
      const total=fav+other;
      const raw=fav+"/"+total;
      const simp=fracStr(fav,total);
      return typedFrac("A bag has "+fav+" red marbles and "+other+" blue marbles. If you draw one marble at random, what is the probability it is red? (give a fraction)",
        raw, simp, "P(red) = favorable ÷ total = "+fav+"/"+total+(simp!==raw?" = "+simp:"")+".");
    },
    // 9. Mean of two numbers (midpoint)
    function(){
      let a=rand(2,40), b=rand(2,40);
      while((a+b)%2!==0) b++;
      const m=(a+b)/2;
      return typed("What is the mean (average) of "+a+" and "+b+"?",
        m, "Mean = ("+a+" + "+b+") ÷ 2 = "+(a+b)+" ÷ 2 = "+m+".");
    },
    // 10. Count occurrences / frequency
    function(){
      const v=rand(1,6);
      const cnt=rand(2,4);
      let arr=[];
      for(let i=0;i<cnt;i++) arr.push(v);
      while(arr.length<8){ const x=rand(1,9); if(x!==v) arr.push(x); }
      arr=shuffle(arr);
      return typed("How many times does the number "+v+" appear in this data set?<br>"+lst(arr),
        cnt, "Count each "+v+" in the list: it appears "+cnt+" times.");
    },
    // 11. Probability of NOT an event
    function(){
      const fav=rand(1,4);
      const other=rand(3,6);
      const total=fav+other;
      const rawN=other+"/"+total;
      const simpN=fracStr(other,total);
      return typedFrac("A spinner has "+total+" equal sections, and "+fav+" of them are green. What is the probability the spinner does NOT land on green? (give a fraction)",
        rawN, simpN, "P(not green) = (total − green) ÷ total = "+other+"/"+total+(simpN!==rawN?" = "+simpN:"")+".");
    },
    // 12. Mean (decimal allowed, short)
    function(){
      const arr=[];
      for(let i=0;i<4;i++) arr.push(rand(1,12));
      // force sum to give one-decimal mean (sum ends in 2 over 4 etc). Just compute.
      let s=sumArr(arr);
      while(s%2===0){ arr[0]++; s=sumArr(arr); } // make mean a .5 value
      const mean=s/4;
      return typed("Find the mean of this data set:<br>"+lst(arr),
        fmt(mean), "Mean = sum ÷ count = "+s+" ÷ 4 = "+fmt(mean)+".");
    },
    // 13. Find which value is the mode (MC) when read from a list
    function(){
      const m=rand(1,9);
      let others=[];
      while(others.length<3){ const x=rand(1,12); if(x!==m&&others.indexOf(x)===-1) others.push(x); }
      const arr=shuffle([m,m,m].concat(others));
      const choices=shuffle([m].concat(others)).map(String);
      const sh=shuffle(choices);
      return {type:"mc", q:"Which value is the mode of this data set?<br>"+lst(arr),
        choices:sh, answer:sh.indexOf(String(m)),
        explain:"The mode is the most frequent value. "+m+" appears 3 times; the others appear once each."};
    },
  ],

  /* ===================== HARD (placement bar) ===================== */
  [
    // 1. Median (even count)
    function(){
      const n=pick([4,6]);
      let arr=[];
      for(let i=0;i<n;i++) arr.push(rand(1,30));
      const s=sortAsc(arr);
      const lo=s[n/2-1], hi=s[n/2];
      let med=(lo+hi)/2;
      return typed("Find the median of this data set:<br>"+lst(arr),
        fmt(med), "Sort: "+lst(s)+". With "+n+" values, the median is the average of the two middle values: ("+lo+" + "+hi+") ÷ 2 = "+fmt(med)+".");
    },
    // 2. Mean -> missing value
    function(){
      const n=pick([4,5]);
      const mean=rand(8,16);
      const total=mean*n;
      let known=[];
      for(let i=0;i<n-1;i++) known.push(rand(3,18));
      const miss=total-sumArr(known);
      if(miss<1||miss>40) return TIERS[1][1]();
      return typed("The mean of "+n+" numbers is "+mean+". "+(n-1)+" of them are "+lst(known)+". What is the missing number?",
        miss, "Total needed = mean × count = "+mean+" × "+n+" = "+total+". Missing = "+total+" − "+sumArr(known)+" = "+miss+".");
    },
    // 3. Score needed to reach target average
    function(){
      const k=pick([3,4]); // existing tests
      const targetMean=rand(80,90);
      const totalNeeded=targetMean*(k+1);
      let scores=[];
      for(let i=0;i<k;i++) scores.push(rand(70,95));
      const need=totalNeeded-sumArr(scores);
      if(need<60||need>100) return TIERS[1][2]();
      return typed("You scored "+lst(scores)+" on "+k+" tests. What must you score on the next test to have a mean of exactly "+targetMean+" across all "+(k+1)+" tests?",
        need, "Total needed for mean "+targetMean+" over "+(k+1)+" tests = "+targetMean+" × "+(k+1)+" = "+totalNeeded+". Needed score = "+totalNeeded+" − "+sumArr(scores)+" = "+need+".");
    },
    // 4. Mean after adding a value
    function(){
      const n=rand(4,6);
      const mean=rand(6,14);
      const total=mean*n;
      let added=rand(1,30);
      while((total+added)%(n+1)!==0) added++;
      const newMean=(total+added)/(n+1);
      return typed("A data set of "+n+" numbers has a mean of "+mean+". A new value of "+added+" is added. What is the new mean?",
        fmt(newMean), "Old total = "+mean+" × "+n+" = "+total+". New total = "+total+" + "+added+" = "+(total+added)+". New mean = "+(total+added)+" ÷ "+(n+1)+" = "+fmt(newMean)+".");
    },
    // 5. Mean after removing a value
    function(){
      const n=rand(5,7);
      const mean=rand(8,15);
      const total=mean*n;
      let removed=rand(1,30);
      while((total-removed)%(n-1)!==0 || total-removed<0) removed++;
      const newMean=(total-removed)/(n-1);
      return typed("A data set of "+n+" numbers has a mean of "+mean+". The value "+removed+" is removed. What is the new mean of the remaining numbers?",
        fmt(newMean), "Old total = "+mean+" × "+n+" = "+total+". New total = "+total+" − "+removed+" = "+(total-removed)+". New mean = "+(total-removed)+" ÷ "+(n-1)+" = "+fmt(newMean)+".");
    },
    // 6. Comparing two means
    function(){
      const nA=rand(3,5), nB=rand(3,5);
      const mA=rand(6,15), mB=rand(6,15);
      let A=[], B=[];
      for(let i=0;i<nA-1;i++) A.push(rand(2,18));
      A.push(mA*nA-sumArr(A));
      for(let i=0;i<nB-1;i++) B.push(rand(2,18));
      B.push(mB*nB-sumArr(B));
      if(A[A.length-1]<1||B[B.length-1]<1) return TIERS[1][5]();
      const diff=Math.abs(mA-mB);
      if(diff===0) return TIERS[1][5]();
      const higher=mA>mB?"A":"B";
      return mcText("Group A scores: "+lst(A)+".<br>Group B scores: "+lst(B)+".<br>Which group has the higher mean?",
        ["Group A","Group B","They are equal","Cannot tell"],
        higher==="A"?"Group A":"Group B",
        "Mean A = "+sumArr(A)+" ÷ "+nA+" = "+mA+". Mean B = "+sumArr(B)+" ÷ "+nB+" = "+mB+". Group "+higher+" is higher.");
    },
    // 7. Probability as a fraction (simplifying required)
    function(){
      const total=pick([8,9,10,12,15,16,18,20]);
      let fav=rand(2,total-1);
      while(gcd(fav,total)===1) fav=rand(2,total-1); // ensure it simplifies
      const raw=fav+"/"+total;
      const simp=fracStr(fav,total);
      return typedFrac("A bag has "+total+" tiles numbered 1 to "+total+". "+fav+" of them are winners. What is the probability of drawing a winner? Give your answer as a fraction in simplest form.",
        raw, simp, "P = "+fav+"/"+total+" = "+simp+" after dividing by the GCF.");
    },
    // 8. Mean from a frequency table (small)
    function(){
      const v1=rand(1,4), f1=rand(1,3);
      let v2=rand(5,8), f2=rand(1,3);
      let v3=rand(9,12), f3=rand(1,3);
      const total=f1+f2+f3;
      const sum=v1*f1+v2*f2+v3*f3;
      if(sum%total!==0) return TIERS[1][7]();
      const mean=sum/total;
      return typed("A survey recorded: value "+v1+" ("+f1+" times), value "+v2+" ("+f2+" times), value "+v3+" ("+f3+" times). What is the mean of all the data?",
        mean, "Sum = "+v1+"×"+f1+" + "+v2+"×"+f2+" + "+v3+"×"+f3+" = "+sum+". Count = "+total+". Mean = "+sum+" ÷ "+total+" = "+mean+".");
    },
    // 9. Effect of an outlier (MC)
    function(){
      const base=[rand(8,12),rand(8,12),rand(8,12),rand(8,12)];
      const outlier=rand(40,60);
      return mcText("A data set is "+lst(base)+". A new value of "+outlier+" is added. Which measure changes the MOST?",
        ["The mean","The median","The mode","They all stay the same"], "The mean",
        "An outlier (a value far from the rest) pulls the mean strongly toward it, while the median barely moves. The mean changes most.");
    },
    // 10. Median odd, larger set
    function(){
      const n=pick([7,9]);
      let arr=[];
      for(let i=0;i<n;i++) arr.push(rand(10,60));
      const s=sortAsc(arr);
      const med=s[(n-1)/2];
      return typed("Find the median of this data set:<br>"+lst(arr),
        med, "Sort: "+lst(s)+". The middle of "+n+" values is position "+((n+1)/2)+": "+med+".");
    },
    // 11. Find a value given range and min
    function(){
      const mn=rand(3,15);
      const r=rand(8,25);
      const mx=mn+r;
      return typed("A data set has a smallest value of "+mn+" and a range of "+r+". What is the largest value?",
        mx, "Range = largest − smallest, so largest = smallest + range = "+mn+" + "+r+" = "+mx+".");
    },
    // 12. Probability NOT, simplify
    function(){
      const total=pick([6,8,9,10,12,15,16,20]);
      let fav=rand(2,total-2);
      const notFav=total-fav;
      if(gcd(notFav,total)===1){ fav=2; }
      const nf=total-fav;
      const raw=nf+"/"+total;
      const simp=fracStr(nf,total);
      return typedFrac("A spinner has "+total+" equal sections; "+fav+" are red. What is the probability of NOT landing on red? Give a fraction in simplest form.",
        raw, simp, "Not-red sections = "+total+" − "+fav+" = "+nf+". P(not red) = "+nf+"/"+total+(simp!==raw?" = "+simp:"")+".");
    },
    // 13. Mean of consecutive-ish set / weighted
    function(){
      // average speed style: total distance / total time, clean
      const d1=pick([60,90,120,150,80,100]);
      const d2=pick([60,90,120,150,80,100]);
      const t=pick([2,3,4,5]);
      const totalD=d1+d2;
      if(totalD%t!==0) return TIERS[1][12]();
      const mean=totalD/t;
      return typed("A car travels "+d1+" miles and then "+d2+" miles, taking "+t+" hours in total. What is its average speed in miles per hour?",
        mean, "Average speed = total distance ÷ total time = ("+d1+" + "+d2+") ÷ "+t+" = "+totalD+" ÷ "+t+" = "+mean+" mph.");
    },
  ],

  /* ===================== CHALLENGING (beyond test) ===================== */
  [
    // 1. Mean -> two missing values that are equal
    function(){
      const n=pick([5,6]);
      const mean=rand(9,15);
      const total=mean*n;
      let known=[];
      for(let i=0;i<n-2;i++) known.push(rand(3,16));
      let rem=total-sumArr(known);
      if(rem<2||rem%2!==0||rem/2<1||rem/2>40) return TIERS[2][0]();
      const each=rem/2;
      return typed("The mean of "+n+" numbers is "+mean+". "+(n-2)+" of them are "+lst(known)+". The other two numbers are EQUAL. What is each of those two numbers?",
        each, "Total = "+mean+" × "+n+" = "+total+". The two equal numbers sum to "+total+" − "+sumArr(known)+" = "+rem+". Each = "+rem+" ÷ 2 = "+each+".");
    },
    // 2. Combined mean of two groups
    function(){
      const nA=pick([2,3,4]), nB=pick([2,3,4]);
      const mA=rand(6,14), mB=rand(6,14);
      const total=mA*nA+mB*nB;
      const n=nA+nB;
      if(total%n!==0) return TIERS[2][1]();
      const mean=total/n;
      return typed("Group A has "+nA+" numbers with a mean of "+mA+". Group B has "+nB+" numbers with a mean of "+mB+". What is the mean of all "+n+" numbers combined?",
        mean, "Sum A = "+mA+" × "+nA+" = "+(mA*nA)+". Sum B = "+mB+" × "+nB+" = "+(mB*nB)+". Combined mean = ("+(mA*nA)+" + "+(mB*nB)+") ÷ "+n+" = "+total+" ÷ "+n+" = "+mean+".");
    },
    // 3. Score needed across more tests with a cap (find needed; possible or not)
    function(){
      const k=pick([4,5]);
      const target=rand(85,92);
      const totalNeeded=target*(k+1);
      let scores=[];
      for(let i=0;i<k;i++) scores.push(rand(80,98));
      const need=totalNeeded-sumArr(scores);
      if(need<70||need>100) return TIERS[2][2]();
      return typed("Your test scores so far are "+lst(scores)+". To finish with a mean of "+target+" over "+(k+1)+" tests, what score do you need on the last test?",
        need, "Required total = "+target+" × "+(k+1)+" = "+totalNeeded+". Sum so far = "+sumArr(scores)+". Needed = "+totalNeeded+" − "+sumArr(scores)+" = "+need+".");
    },
    // 4. Two-event probability (independent, multiply) as fraction
    function(){
      const a=pick([[1,2],[1,3],[2,3],[1,4],[3,4],[1,6],[1,5]]);
      const b=pick([[1,2],[1,3],[2,3],[1,4],[3,4],[1,6],[1,5]]);
      const n=a[0]*b[0], d=a[1]*b[1];
      const raw=n+"/"+d;
      const simp=fracStr(n,d);
      return typedFrac("The probability of event A is "+a[0]+"/"+a[1]+" and the probability of event B is "+b[0]+"/"+b[1]+". If A and B are independent, what is the probability that BOTH happen? Give a fraction in simplest form.",
        raw, simp, "P(A and B) = P(A) × P(B) = "+a[0]+"/"+a[1]+" × "+b[0]+"/"+b[1]+" = "+n+"/"+d+(simp!==raw?" = "+simp:"")+".");
    },
    // 5. Median with an unknown to control (find x so median is target) - simpler: new median after adding
    function(){
      // set of 4 sorted, add one value, find new median (5 values)
      let arr=sortAsc([rand(2,10),rand(11,20),rand(21,30),rand(31,40)]);
      const add=rand(2,40);
      const full=sortAsc(arr.concat([add]));
      const med=full[2];
      return typed("A data set is "+lst(arr)+". A new value of "+add+" is added. What is the median of the 5 values now?",
        med, "New sorted set: "+lst(full)+". The median of 5 values is the 3rd one: "+med+".");
    },
    // 6. Weighted average (grades with weights)
    function(){
      const tw=pick([60,70,80]); const ew=100-tw;
      const tests=rand(70,95), exam=rand(70,95);
      const raw=(tests*tw+exam*ew);
      if(raw%100!==0) return TIERS[2][5]();
      const grade=raw/100;
      return typed("Tests count for "+tw+"% of the grade and the final exam counts for "+ew+"%. A student has a test average of "+tests+" and an exam score of "+exam+". What is the final grade?",
        grade, "Final = (test% × test avg + exam% × exam score) ÷ 100 = ("+tw+" × "+tests+" + "+ew+" × "+exam+") ÷ 100 = ("+(tests*tw)+" + "+(exam*ew)+") ÷ 100 = "+grade+".");
    },
    // 7. Effect of removing outlier on mean (compute new mean)
    function(){
      const core=[rand(10,15),rand(10,15),rand(10,15),rand(10,15)];
      const outlier=pick([50,60,40,55]);
      const all=core.concat([outlier]);
      let total=sumArr(all);
      // adjust so core mean clean after removal
      let newTotal=sumArr(core);
      if(newTotal%4!==0){ core[0]+=4-(newTotal%4); newTotal=sumArr(core); }
      const newMean=newTotal/4;
      const all2=core.concat([outlier]);
      return typed("A data set is "+lst(all2)+". The outlier "+outlier+" is removed. What is the mean of the 4 remaining values?",
        newMean, "Remaining values: "+lst(core)+". Sum = "+newTotal+". Mean = "+newTotal+" ÷ 4 = "+newMean+".");
    },
    // 8. Probability with replacement vs not - keep simple: "at least one" complement (2 coins style)
    function(){
      // probability of NOT getting a specific outcome on a fair die rolled, P(not 6 twice) = 25/36 style but keep one roll
      const sides=pick([4,5,6,7,8,9,10,12,15,20]);
      const losing=rand(1,sides); // the face to avoid
      const n=sides-1;
      const raw=n+"/"+sides;
      const simp=fracStr(n,sides);
      return typedFrac("A fair "+sides+"-sided die is rolled once. What is the probability of NOT rolling a "+losing+"? Give a fraction in simplest form.",
        raw, simp, "Faces that are not "+losing+": "+n+" out of "+sides+". P = "+n+"/"+sides+(simp!==raw?" = "+simp:"")+".");
    },
    // 9. Find missing value given median (even count, control)
    function(){
      // 3 known + 1 unknown x, given median; arrange so x is one of the two middle
      const a=rand(2,8), b=rand(10,14), c=rand(20,26);
      const med=rand(b+1,c-1); // median between b and c, unknown x sits beside b
      // set {a,b,x,c} sorted; median=(b+x)/2 => x=2*med-b, need b<=x<=c
      const x=2*med-b;
      if(x<=b||x>=c || (b+x)%2!==0) return TIERS[2][8]();
      return typed("Three of the four numbers in a data set are "+a+", "+b+", and "+c+". The median of all four numbers is "+med+". What is the fourth number? (it lies between "+b+" and "+c+")",
        x, "Sorted, the two middle numbers are "+b+" and the unknown x, so median = ("+b+" + x) ÷ 2 = "+med+". Then x = 2×"+med+" − "+b+" = "+x+".");
    },
    // 10. Combined: total points then average per game
    function(){
      const games=pick([4,5,6]);
      const perGame=rand(8,20);
      const total=perGame*games;
      const extra=rand(2,10);
      const newTotal=total+extra;
      const newGames=games+1;
      if(newTotal%newGames!==0) return TIERS[2][9]();
      const newAvg=newTotal/newGames;
      return typed("A player averaged "+perGame+" points over "+games+" games. In the next game she scored "+extra+" points. What is her new scoring average over all "+newGames+" games?",
        fmt(newAvg), "Old total = "+perGame+" × "+games+" = "+total+". New total = "+total+" + "+extra+" = "+newTotal+". New average = "+newTotal+" ÷ "+newGames+" = "+fmt(newAvg)+".");
    },
    // 11. Probability complement of two independent (neither) - keep as single fraction multiply of (1-p)
    function(){
      const pairs=pick([[1,2],[1,3],[2,5],[1,4],[3,5],[1,5]]);
      const num=pairs[0], den=pairs[1];
      // P(not) = (den-num)/den, squared for two trials
      const nn=(den-num)*(den-num), dd=den*den;
      const raw=nn+"/"+dd;
      const simp=fracStr(nn,dd);
      return typedFrac("Each time you spin, the probability of winning is "+num+"/"+den+". You spin twice (independent). What is the probability you win NEITHER time? Give a fraction in simplest form.",
        raw, simp, "P(not win once) = "+(den-num)+"/"+den+". For two independent spins: ("+(den-num)+"/"+den+")² = "+nn+"/"+dd+(simp!==raw?" = "+simp:"")+".");
    },
    // 12. Mean increases by k when a value added -> find that value
    function(){
      const n=rand(4,6);
      const oldMean=rand(8,14);
      const inc=pick([1,2]);
      const newMean=oldMean+inc;
      // added value = newMean*(n+1) - oldMean*n
      const added=newMean*(n+1)-oldMean*n;
      if(added<1||added>60) return TIERS[2][11]();
      return typed("A data set of "+n+" numbers has a mean of "+oldMean+". After adding one new number, the mean becomes "+newMean+". What is the value of the new number?",
        added, "Old total = "+oldMean+" × "+n+" = "+(oldMean*n)+". New total needed = "+newMean+" × "+(n+1)+" = "+(newMean*(n+1))+". New number = "+(newMean*(n+1))+" − "+(oldMean*n)+" = "+added+".");
    },
    // 13. Expected value style: average of a simple game (whole result)
    function(){
      // mean of consecutive integers a..b = (a+b)/2; choose so (a+b) even -> clean
      const a=rand(1,10);
      let b=a+rand(3,12);
      while((a+b)%2!==0) b++;
      const avg=(a+b)/2;
      return typed("What is the mean (average) of all the whole numbers from "+a+" to "+b+" (inclusive)?",
        avg, "For evenly spaced numbers, the mean equals the average of the first and last: ("+a+" + "+b+") ÷ 2 = "+(a+b)+" ÷ 2 = "+avg+".");
    },
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
