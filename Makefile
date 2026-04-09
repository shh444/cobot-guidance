SPHINXOPTS ?=
SPHINXBUILD ?= sphinx-build
SOURCEDIR = docs
BUILDDIR = docs/_build
.RECIPEPREFIX := >

help:
> @$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS)

.PHONY: help Makefile

%: Makefile
> @$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS)
