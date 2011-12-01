import os, sys
import Image

im = Image.open("map1.bmp")
pix = im.load()
map=[]
for x in range(226):
	map.append([])
	for y in range(20):
		pi=pix[x,y]
		if pi!=(255,255,255):
			pass
			#print pi
		#if pi==(255,255,255):#white=space
		#	map[x].append(" ")
		if pi==(0,0,0) or pi==(1,3,11):#black
			map[x].append("T")
			#print "terain"
		elif pi==(0,255,0):#green
			map[x].append("S")
		elif pi==(222,206,31):#maroon
			map[x].append("B")
			#print "block"
		elif pi==(0,15,255) or pi==(0,0,255):#blue
			map[x].append("C1")
			print "Commy"
		elif pi==(255,0,0):#red
			map[x].append("E")
		else:#white
			map[x].append(" ")
out=open("maps.js", "w+")
out.write("map1="+str(map)+";")
out.close()
