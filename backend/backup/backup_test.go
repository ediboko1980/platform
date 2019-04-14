package backup

import (
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/stretchr/testify/assert"
	"testing"
)

func TestListExisting(t *testing.T) {
	dir := createTempDir()
	defer os.RemoveAll(dir)
	tmpfn := filepath.Join(dir, "tmpfile")
	if err := ioutil.WriteFile(tmpfn, []byte(""), 0666); err != nil {
		log.Fatal(err)
	}
	list, err := New(dir).List()
	assert.Nil(t, err)
	assert.Equal(t, list, []string{dir + "/tmpfile"})
}

func TestCreateBackupDir(t *testing.T) {
	dir := createTempDir()
	defer os.RemoveAll(dir)
	list, err := New(dir + "/new").List()
	assert.Nil(t, err)
	assert.Equal(t, len(list), 0)
}

func createTempDir() string {
	dir, err := ioutil.TempDir("", "test")
	if err != nil {
		log.Fatal(err)
	}
	return dir
}
