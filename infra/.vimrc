" To source this file use :so $MYVIMRC

" E319: Sorry, the command is not available in this version
" To fix this: sudo apt-get install vim-gui-common
" http://askubuntu.com/questions/284957/vi-getting-multiple-sorry-the-command-is-not-available-in-this-version-af

" This must be first, because it changes other options as side effect
set nocompatible

" Use pathogen to easily modify the runtime path to include all
" plugins under the ~/.vim/bundle directory
"   If on Windows, then copy the settings/.vim/* to C:\Program Files(x86)\Vim\vimfiles
"   Then add to C:\Program Files(x86)\Vim\_vimrc: source $VIMRUNTIME/.../settings/.vimrc
call pathogen#helptags()
call pathogen#incubate()

" 'a goes to line with ma, this makes `a do the same
nnoremap ' `
nnoremap ` '
" use ; instead of :

" Leaders are personal modifier keys, may want to try spacebar
let mapleader=","
"Quickly edit/reload the vimrc file
nmap <silent> <leader>ev :e $MYVIMRC<CR>
nmap <silent> <leader>sv :so $MYVIMRC<CR>
nmap <silent> <leader>d  :b#<bar>bd#<CR>

" Lets current buffer to be backgrounded w/o writing
set hidden

set nowrap        " don't wrap lines
set tabstop=2     " a tab is two spaces
set backspace=indent,eol,start
                  " allow backspacing over everything in insert mode
set autoindent    " always set autoindenting on
set copyindent    " copy the previous indentation on autoindenting
set number        " always show line numbers
set shiftwidth=2  " number of spaces to use for autoindenting
set shiftround    " use multiple of shiftwidth when indenting with '<' and '>'
set showmatch     " set show matching parenthesis
set ignorecase    " ignore case when searching
set smartcase     " ignore case if search pattern is all lowercase,
                  "    case-sensitive otherwise
set smarttab      " insert tabs on the start of a line according to
                  "    shiftwidth, not tabstop
set expandtab			" change tab to spaces   
  
set history=1000         " remember more commands and search history
set undolevels=1000      " use many muchos levels of undo
set wildignore=*.swp,*.bak,*.pyc,*.class
set title                " change the terminal's title
set visualbell           " don't beep
set noerrorbells         " don't beep


" -f says not to load .cshrc, but then we don't source aliases, so I removed
"  setenv, and use -i for interactive mode so we get aliases
set shellcmdflag=-ic


" Enables % to work with if/elsif/else/end
runtime macros/matchit.vim

" Show options with make file and command completion
set wildmenu
"set wildmenu=list:longer "shell completion style

" Keep 3 lines between cursor and edge
set scrolloff=3

" Store vim swaps to a specific tmp {{{
if has("win32") || has("win16")
  set directory+=%TEMP%
else
  set backupdir=~/.vim-tmp,~/.tmp,~/tmp,/var/tmp,/tmp
  set directory=~/.vim-tmp,~/.tmp,~/tmp,/var/tmp,/tmp
endif
"}}}

" Scroll by 3 lines C+e,C+y,mouse
nnoremap <C-e> 3<C-e>
nnoremap <C-y> 3<C-y>

" Curser status
set ruler

" File-type highlighting and configuration.
" Run :filetype (without args) to see what you may have
" to turn on yourself, or just set them all to be sure.
syntax on
filetype on
filetype plugin on
filetype indent on
 
" Highlight search terms... ",n"
set hlsearch
set incsearch " ...dynamically as they are typed.
nmap <silent> <leader>n :silent :nohlsearch<CR> 
" hide with n

" Make whitespace visible on request ",w"

"set listchars=tab:>-,trail:·,eol:$
set listchars=eol:$,tab:>-,trail:~,extends:>,precedes:<
nmap <silent> <leader>w :set nolist!<CR>

" Font
"if has("gui_running")
"  "set guifont=Monoid
"  set guifont=Monoid\ Semi-Condensed\ 10
"endif

" Stifle interruptive prompts
"set shortmess=atI

if &t_Co >= 256 || has("gui_running")
   colorscheme asmanian2
endif

if &t_Co > 2 || has("gui_running")
   " switch syntax highlighting on, when the terminal has colors
   syntax on
endif

" toggle auto indent for pasting mode
set pastetoggle=<F2>

" mouse cheat
" set mouse=a

" auto-formatting

" Use Q for formatting the current paragraph (or selection)
vmap Q gq
nmap Q gqap

" tags 
set tags+=$SRCROOT/tags

" make using CPAN via libvi-quickfix-perl, :make & :copen ? :cwin
:set makeprg=cd\ %:h;make\ TMPCFLAGS='-pedantic'
:set errorformat&
:set errorformat+=from\ %f:%l
:set errorformat^=In\ file\ included\ from\ %f:%l:%c
:set errorformat+=%m\ at\ %f\ line\ %l\.
:set errorformat+=%m\ at\ %f\ line\ %l
:set errorformat+=g++:\ error:\ %m

" spellchecking
:set spell spelllang=en_us
"nmap <silent> <leader>s :set spell spelllang=en_us<CR>
nmap <silent> <leader>s :set nospell<CR>

" set size
if has("gui_running")
  :set lines=50 columns=105
endif

" set cmd height
":set cmdheight=1

" open the quickfix window
":copen 5

" Tab cycle buffers
:nnoremap <Tab> :bnext<CR>
:nnoremap <S-Tab> :bprevious<CR>

" Remapped, the ! won't error if vimrc is resources
:command! Q q
:command! W w
:command! Wa wa

"if has("cscope")
"  set csprg=/usr/bin/cscope
"  set csto=0
"  set cst
"  set nocsverb
"  " add any database in current directory
"  if filereadable("cscope.out")
"    cs add cscope.out
"  " else add database pointed to by environment
"  elseif $CSCOPE_DB != ""
"    cs add $CSCOPE_DB
"  endif
"  set csverb
"endif

" cscope
"nmap <C-Space>s :cs find s <C-R>=expand("<cword>")<CR><CR>
"nmap <C-Space>g :cs find g <C-R>=expand("<cword>")<CR><CR>
"nmap <C-Space>c :cs find c <C-R>=expand("<cword>")<CR><CR>
"nmap <C-Space>t :cs find t <C-R>=expand("<cword>")<CR><CR>
"nmap <C-Space>e :cs find e <C-R>=expand("<cword>")<CR><CR>
"nmap <C-Space>f :cs find f <C-R>=expand("<cfile>")<CR><CR>
"nmap <C-Space>i :cs find i ^<C-R>=expand("<cfile>")<CR>$<CR>
"nmap <C-Space>d :cs find d <C-R>=expand("<cword>")<CR><CR>

" change line number background so you can see where the line starts
highlight LineNr ctermfg=yellow ctermbg=black guibg=#444444

" highligh that which is at and over 81 columns
"highlight OverLength ctermbg=red ctermfg=white guibg=#592929
"match OverLength /\%81v.\{1,3\}/
"match OverLength /\%81v.+/
highlight CursorLine   cterm=NONE ctermbg=darkred ctermfg=white guibg=darkred guifg=white
highlight CursorColumn cterm=NONE ctermbg=darkred ctermfg=white guibg=darkred guifg=white
nnoremap <leader>c :set cursorline! cursorcolumn!<CR>
set colorcolumn=80
highlight ColorColumn cterm=NONE ctermbg=lightgrey guibg=#444444


" allow undo even if the file was already saved
if has('persistent_undo')      "check if your vim version supports it
  set undofile                 "turn on the feature  
  set undodir=$HOME/.vim/undo  "directory where the undo files will be stored
endif  
