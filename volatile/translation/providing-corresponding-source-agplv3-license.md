# Do I need to provide access to source code under the AGPLv3 license?

# 我需要提供他人存取AGPLv3授權的程式碼嗎？

![我需要提供他人存取AGPLv3授權的程式碼嗎？](https://opensource.com/sites/default/files/styles/image-full-size/public/images/law/LAW_PatentSpotlight_520x292_cm.png.png?itok=bCn-kMx2)

*圖片取自 opensource.com*

作者： [Jeffrey Robert Kaufman](https://opensource.com/users/jkaufman)

原文網址： https://opensource.com/article/17/1/providing-corresponding-source-agplv3-license

The [GNU Affero General Public License version 3][] (AGPLv3) is a copyleft license nearly identical to the GPLv3. Both licenses have the same copyleft scope, but materially differ in one important way. The AGPLv3's Section 13 states an additional condition not present in GPLv2 or GPLv3:

[GNU Affero General Public License 第3版][] (AGPLv3) 是和GPLv3非常接近的copyleft (著佐權)授權條款。
兩個授權條款具有相同的copyleft範疇，但有一個很重要的差異。
AGPLv3的第13節多了一條在GPLv2和GPLv3所沒有的條文。

> Notwithstanding any other provision of this License, if you modify the Program, your modified version must prominently offer all users interacting with it remotely through a computer network (if your version supports such interaction) an opportunity to receive the Corresponding Source of your version by providing access to the Corresponding Source from a network server at no charge, through some standard or customary means of facilitating copying of software.

> 除了這個授權條款的其他規定，如果你修改這個程式，你必須要在伺服器上顯著的免費提供你的版本的原始碼給所有藉由電腦網路和這個程式遠端互動的人(如果你的版本支援這種互動)，並透過一些標準或習慣的方式促進軟體的複製。

(我覺得中英文條文都需要附上)

This condition was intended to apply mainly to what would now be considered SaaS deployments, although the reach of "interacting remotely through a computer network" should perhaps be read to cover situations going beyond conventional SaaS. The objective was to close a perceived loophole in the ordinary GPL in environments where users make use of functionality provided as a web service, but no distribution of the code providing the functionality occurs. Hence, Section 13 provides an additional source code disclosure requirement beyond the object code distribution triggered requirement contained in GPLv2 Section 3 and GPLv3 and AGPLv3 Section 6.

這個條件本來適用在現在被認為是SaaS (Software as a Service，軟體即服務)的部署，雖然「藉由電腦網路遠端互動」的範疇也許可以解讀成包含不只一般SaaS的情況。
條文目的是要修補GPL條文中已知的漏洞，這使得使用者可以把功能做成網路服務，而不發布提供這些功能的程式碼。
因此，比起已在GPLv2的第3節和GPLv3、AGPLv3的第6節有提到的發佈原始碼條件，第13節增加額外的原始碼必須公布的條件。

What is often misunderstood is that the source code requirement in AGPLv3 Section 13 is triggered only where the AGPLv3 software has been modified by "you" (for example, the entity providing the network service). My interpretation is that, so long as "you" do not modify the AGPLv3 code, the license should not be read as requiring access to the Corresponding Source in the manner prescribed by Section 13. As I see it, many unmodified and standard deployments of software modules under AGPL simply do not trigger Section 13, although making the source code available even if not required under the license is a good idea.

常被誤解的是，AGPLv3第13節的原始碼要求，只有在AGPLv3的軟體有被「你」修改時才會被觸發(例如，提供網路服務的實體)。
我的解讀是，只要你沒有修改AGPLv3的程式碼，這個授權條款就不該被解讀成需要按照第13節所規定的，提供相對應的程式碼。
依我看來，大部分未經修改和標準部署的AGPL軟體模組不會觸發第13節，雖然在條款沒有要求的情況下公開原始碼也是件好事。

How terms and conditions of the AGPL could be interpreted, including whether the AGPL software has been modified, may require legal analysis depending on the facts and details of the specific use case.

AGPL的條文和條件要如何解讀，包括AGPL的軟體算不算被修改，可能需要針對各個案例的事實和細節做法律上的分析。

[GNU Affero General Public License version 3]: https://www.gnu.org/licenses/agpl-3.0-standalone.html
[GNU Affero General Public License 第3版]: https://www.gnu.org/licenses/agpl-3.0-standalone.html

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" title="本著作係採用創用 CC 姓名標示-相同方式分享 4.0 國際 授權條款授權."></a>
