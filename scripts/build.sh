webpack  
echo "<script>" >> ./dist/index.html  
cat ./dist/bundle.js >> ./dist/index.html  
echo "</script>" >> ./dist/index.html  
sed -i 's/<script defer="defer" src="bundle.js">//g' ./dist/index.html   
rm ./dist/bundle.js
rm ./dist/bundle.js.LICENSE.txt