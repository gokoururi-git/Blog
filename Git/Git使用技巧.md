# Git使用技巧

[git可视化学习网站](https://learngitbranching.js.org/?NODEMO=&locale=zh_CN)

vscode安装插件`GitLens`辅助git流程

1. git stash

    暂存当前改动，回到本地仓库最新一次commit的状态

2. git pop

    抽出暂存改动，恢复到修改状态

3. 撤销上一次commit

    参考[git 取消commit](https://www.cnblogs.com/lyy-2016/p/6509707.html)

    1. 第一种情况：还没有push，只是在本地commit

        ```bash
        git reset --soft|--mixed|--hard <commit_id>
        git push develop develop --force  (本地分支和远程分支都是 develop)  
        ```

        这里的`<commit_id>`就是每次commit的`SHA-1`，可以在log里查看到

        `--mixed`    会保留源码,只是将git commit和index 信息回退到了某个版本.

        `--soft`   保留源码,只回退到commit信息到某个版本.不涉及index的回退,如果还需要提交,直接commit即可.

        `--hard`    源码也会回退到某个版本,commit和index 都会回退到某个版本.(注意,这种方式是改变本地代码仓库源码)

        当然有人在push代码以后,也使用 reset --hard <commit...> 回退代码到某个版本之前,但是这样会有一个问题,你线上的代码没有变,线上commit,index都没有变,当你把本地代码修改完提交的时候你会发现全是冲突.....这时换下一种

    2. commit push 代码已经更新到远程仓库

        对于已经把代码push到线上仓库,你回退本地代码其实也想同时回退线上代码,回滚到某个指定的版本,线上,线下代码保持一致.你要用到下面的命令

        ```bash
        git revert <commit_id>
        ```

        revert 之后你的本地代码会回滚到指定的历史版本,这时你再 git push 既可以把线上的代码更新。

        **注意：git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit，看似达到的效果是一样的,其实完全不同。**

        第一:上面我们说的如果你已经push到线上代码库, reset 删除指定commit以后,你git push可能导致一大堆冲突.但是revert 并不会.

        第二:如果在日后现有分支和历史分支需要合并的时候,reset 恢复部分的代码依然会出现在历史分支里.但是revert 方向提交的commit 并不会出现在历史分支里.

        第三:reset 是在正常的commit历史中,删除了指定的commit,这时 HEAD 是向后移动了,而 revert 是在正常的commit历史中再commit一次,只不过是反向提交,他的 HEAD 是一直向前的.


4. 如何撤销上一次add

    > add: `git status`之后在 “Changes to be committed” 这行下面的，就说明是已暂存状态。也就是说这些文件被add过，但是没有commit。如果此时提交，那么该文件此时此刻的版本将被留存在历史记录中。

    - 撤销全部上一次add

        ```bash
        git reset HEAD
        ```

    - 撤销某个文件的add

        ```bash
        git reset HEAD <路径/文件名>
        ```

    另外、使用`GitLens`插件可以直接对文件进行加减按钮的操作会更方便

5. 拉取远程某个分支

    拉取远程所有分支

    ```bash
    git fetch origin
    ```

    拉取远程某个分支

    ```bash
    git fetch origin <branch>
    ```

    注意：fetch可以在任何分支进行，并不会对当前分支有所影响，但是pull = fetch + merge所以会有影响

    另外，可以通过在master分支进行git pull也可以拿到远程的分支信息

6. 对比多个分支

    一般来说用`GitLens`插件的`search & compare`比较方便

    另外可以参考[git diff的最全最详细的4大主流用法](https://blog.csdn.net/wq6ylg08/article/details/88798254)


7. 将多个commit合并为一个commit

    一般来说最后一次合master的时候进行一次rebase比较好

8. 创建一个分支

    `git checkout -b xxx`的含义是**在当前分支的基础**上分出来一个新的**本地分支**

    只有当我们git push origin xxx的时候远程会检测有没有这个分支，如果没有就创建一个远程分支

9. git reset

    git reset 一种有3种模式：

    ```bash
    git reset --mixed <SHA> #默认
    git reset --hard <SHA>
    git reset --soft <SHA>
    ```

    其中：

    - `--mixed`是指HEAD指向目标提交，然后将所有后续提交放入工作区（未add前），这也是默认模式

    - `--hard`是指HEAD指向目标提交，然后将所有后续提交扔掉

    - `--soft`是指HEAD指向目标提交，然后将所有后续提交放入暂存区（add后，commit前）

10. git revert

```bash
git revert <SHA>
```

它的作用是用SHA对应的Commit的上一个commit和当前最新commit进行merge，之前的commit不会被删除