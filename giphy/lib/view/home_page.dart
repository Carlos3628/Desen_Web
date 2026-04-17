import 'package:flutter/material.dart';
import 'package:giphy_application/service/giphy_service.dart';
import 'package:giphy_application/view/gif_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String search = "";
  int offset = 0;
  bool loadingMore = false;
  bool isSearching = false;
  List gifData = [];

  final GiphyService giphyService = GiphyService();

  void initState() {
    super.initState();
    loadGifs();
  }

  void loadGifs() {
    setState(() async {
      loadingMore = true;
      var newGifs = await giphyService.getGifs(search, offset);
      setState(() {
        loadingMore = false;
        gifData.addAll(newGifs["data"]);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Image.network(
          "https://developers.giphy.com/branch/master/static/header-logo-0fec0225d189bc0eae27dac3e3770582.gif",
        ),
        centerTitle: true,
      ),
      backgroundColor: Colors.black,
      body: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.all(10.0),
            child: TextField(
              decoration: InputDecoration(
                labelText: "Pesquise aqui.",
                labelStyle: TextStyle(color: Colors.white),
                border: OutlineInputBorder(),
              ),
              style: TextStyle(color: Colors.white, fontSize: 18),
              textAlign: TextAlign.center,
              onSubmitted: (value) {
                setState(() {
                  search = value;
                  offset = 0;
                  gifData.clear();
                  isSearching = true;
                });
                loadGifs();
              },
            ),
          ),
          Expanded(
            child: gifData.isEmpty && !loadingMore && !isSearching
                ? Center(
                    child: CircularProgressIndicator(
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      strokeWidth: 5.0,
                    ),
                  )
                : createGifTable(),
          ),
        ],
      ),
    );
  }

  Widget createGifTable() {
    bool hasMoreGifs = gifData.length < 25;
    return GridView.builder(
      padding: EdgeInsets.all(10.0),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2, crossAxisSpacing: 10.0, mainAxisSpacing: 10.0),
      itemCount: gifData.length + 1,
      itemBuilder: (context, index){
        if(index < gifData.length){
          var gif = gifData[index];
          var gifUrl = gif["images"]["original"]["url"];
          return GestureDetector(
            child: Image.network(
            gifUrl, height: 300.0, fit: BoxFit.cover),
            onTap: (){
              Navigator.push(context, MaterialPageRoute(builder: (context) => GifPage(gif)),
              );
            },
          );
        }else{
          return Container(
            child: GestureDetector(
              onTap: !loadingMore ? (){
                setState(() {
                  loadingMore = true;
                  offset += 25;
                });
                loadGifs();
              } : null,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(Icons.add, color: Colors.white, size: 70.0),
                  Text("Carregar mais...",
                    style: TextStyle(color: Colors.white, fontSize: 22.0),
                  )
                ],
              ),
            ),
          );
        }
      });
  }
}
