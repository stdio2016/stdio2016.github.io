# Using the command-line calendar and date functions in Linux

# 在Linux命令列裡使用萬年曆和日期功能

![在Linux命令列裡使用萬年曆和日期功能](https://opensource.com/sites/default/files/styles/image-full-size/public/images/business/osdc_terminals.png?itok=QmkPW7P1)

原文網址： https://opensource.com/article/16/12/using-calendar-function-linux

作者：  [Don Watkins](https://opensource.com/users/don-watkins)

I have always interested in historical dates and determining what actual day of the week an event occurred on. What day of the week was the Declaration of Independence signed? What day of the week was I born on? What day of the week did the 4th of July in 1876 occur on? I know that you can use search engines to answer many of these questions. But, did you know that the Linux command line can supply those answers too?

我一直對於歷史上的日期，以及了解歷史事件發生在星期幾很有興趣。
獨立宣言在星期幾簽訂？
我星期幾出生？
1876年7月4日是星期幾？
我知道你們可以利用搜尋引擎來回答這類的問題。
但是，你知道Linux的命令列也可以回答這些問題嗎？

July 4, 1776, was a Thursday. July 4 in 1876 was a Tuesday. My mom is celebrating her birthday soon and I know that she was born on Saturday, November 6. (I can't tell you what year because she would not like to know that I'm telling people her age.)

1776年7月4日是星期四。
1876年的7月4日是星期二。
我媽媽的生日快到了，而我知道她出生於11月6日星期六。
(我不能告訴你是哪一年，因為她大概不希望我告訴各位她的年紀。)

The Linux date and calendar commands can do far more than just providing these fun factoids, though. Here are some easy examples of cal commands you can issue on the command line:

Linux的日期和萬年曆指令能做的可不只是得到這些有趣的訊息。
以下是在命令列中使用cal指令的簡單的例子：

Display current calendar month: `$ cal`

顯示這個月的月曆： `$ cal`

    November 2016      
    Su Mo Tu We Th Fr Sa  
           1  2  3  4  5  
     6  7  8  9 10 11 12  
    13 14 15 16 17 18 19  
    20 21 22 23 24 25 26  
    27 28 29 30   

Display a calendar for a specific month: `$ cal -m February`

顯示特定月份的月曆： `$ cal -m February`

       February 2016      
    Su Mo Tu We Th Fr Sa  
        1  2  3  4  5  6  
     7  8  9 10 11 12 13  
    14 15 16 17 18 19 20  
    21 22 23 24 25 26 27  
    28 29     

Display a calendar with the Julian days: `$ cal -j`

讓月曆顯示今年的第幾天：`$ cal -j`

           November 2016         
     Su  Mo  Tu  We  Th  Fr  Sa  
            306 307 308 309 310  
    311 312 313 314 315 316 317  
    318 319 320 321 322 323 324  
    325 326 327 328 329 330 331  
    332 333 334 335

Display the current month, previous month, and next month: `$ cal -3`

顯示這個月、上個月、以及下個月： `$ cal -3`

     October               November              December        
    Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
                       1         1  2  3  4  5               1  2  3  
     2  3  4  5  6  7  8   6  7  8  9 10 11 12   4  5  6  7  8  9 10  
     9 10 11 12 13 14 15  13 14 15 16 17 18 19  11 12 13 14 15 16 17  
    16 17 18 19 20 21 22  20 21 22 23 24 25 26  18 19 20 21 22 23 24  
    23 24 25 26 27 28 29  27 28 29 30           25 26 27 28 29 30 31  
    30 31

You can show the whole year with `$ cal -y`, or use `$ cal -jy` to display Julian dates beginning with 1 on January 1 and ending on December 31 with 365 or 366 if it's a leap year. You can also figure out slightly more complicated dates with the related ncal command. For example, `$ ncal -e` displays the date of Easter in the current year.

你可以用 `$ cal -y` 秀出年曆，或者用 `$ cal -jy` 顯示儒略日期 (Julian date)，在1月1日時從1開始計，在12月31日時以365結束，如果是閏年的話就是以366結束。
你也可以類似的 ncal 指令處理稍微複雜的日期。
例如，`$ ncal -e`可以查詢今年的復活節。

Like most command-line tools, the calendar tool is composable with pipes or other functions. If you would like a print out of
the entire year then pipe the calendar command to a text file, you can simply run `$ cal 2016 > YearlyCalendar.txt`. The text file can be opened in any text editor and edited or saved to a PDF and shared.

就像大部分的命令列工具，月曆工具可以和管線 (pipes) 以及其他功能一起使用。
如果你要印出一整年的日曆並用管線輸出到文字檔，你可以執行`$ cal 2016 > YearlyCalendar.txt`。
這個文字檔可以用任何文字編輯器開啟和編輯，還可以轉成PDF檔後分享。

The date command in Linux can display the date in several formats, or to set the date on your computer's Linux operating system. The date command can be combined in shell scripts to, for example, easily append a date to file you are editing. Along with the calendar date, the time can also be specified. Here are a few examples.

Linux的date指令可以用各種格式顯示，或者是更改你的電腦上的Linux作業系統時間。
date指令可以在shell腳本裡使用，來輕易的做到像是將你編輯的檔案附上日期。
除了日曆上的日期之外，也可以指定時間。
以下有一些例子：

You can display today's date with: `$ date`

你可以用 `$ date` 顯示今天的日期

    Wed Nov 2 21:20:22 EDT 2016

You can also convert from one date format to another. For example, to convert to the date standard format, use: `$date --date="11/30/16"`

你也可以把日期時間格式轉成另一種。
例如，要轉成日期標準格式，可以用： `$date --date="11/30/16"`

    Wed Nov 30 00:00:00 EST 2016

The time can also be specified: `$ date --date="December 1 2017 12:00:00"`

也可以指定時間： `$ date --date="December 1 2017 12:00:00"`

    Fri Dec 1 12:00:00 EST 2017

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" title="This work is licensed under a Creative Commons Attribution-Share Alike 4.0 International License."></a>
